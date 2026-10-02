import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import { AuthService } from '../auth/auth.service';
import { CasesService } from '../cases/cases.service';
import { sendWelcomeEmail } from '../../lib/welcome-email';

// Eligibility has no dedicated DB table — it's a stateless rules check run
// against the pest + postcode the customer provides, before a Case exists.

export interface EligibilityCheckDto {
  pest: string;
  postcode: string;
}

export interface EligibilityResult {
  eligible: boolean;
  reason?: string;
  product?: { name: string; deliveryCost: number };
}

export interface ClaimDto {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  propertyAddress: string;
  postcode: string;
  pest: string;
  location: string;
  productId?: string;
}

// Simple UK postcode sanity check (not a full validator, just format-level).
const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function findProductFor(pest: string) {
  return prisma.product.findFirst({ where: { pestTarget: pest }, orderBy: { createdAt: 'desc' } });
}

export const EligibilityService = {
  async check(data: EligibilityCheckDto): Promise<EligibilityResult> {
    const pest = data.pest?.trim();
    const postcode = data.postcode?.trim();

    if (!pest || !postcode) {
      return { eligible: false, reason: 'Both pest type and postcode are required' };
    }

    if (!POSTCODE_REGEX.test(postcode)) {
      return { eligible: false, reason: 'Please enter a valid UK postcode' };
    }

    const product = await findProductFor(pest);
    if (!product) {
      return {
        eligible: false,
        reason: `We don't have a free product available for "${pest}" yet. Please choose the pest you're seeing, or contact us and we'll help.`,
      };
    }

    return { eligible: true, product: { name: product.name, deliveryCost: product.deliveryCost } };
  },

  async claim(data: ClaimDto) {
    const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
    const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
    const propertyAddress = typeof data.propertyAddress === 'string' ? data.propertyAddress.trim() : '';

    if (!EMAIL_REGEX.test(email)) throw { status: 400, message: 'Please provide a valid email address' };
    if (!fullName) throw { status: 400, message: 'Full name is required' };
    if (!propertyAddress) throw { status: 400, message: 'Property address is required' };
    if (typeof data.password !== 'string' || data.password.length < 8) {
      throw { status: 400, message: 'Password must be at least 8 characters' };
    }

    const eligibility = await this.check({ pest: data.pest, postcode: data.postcode });
    if (!eligibility.eligible) {
      throw { status: 422, message: eligibility.reason || 'Not eligible' };
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw { status: 409, message: 'An account with this email already exists. Please log in instead.' };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        phone: data.phone?.trim() || undefined,
        role: 'CUSTOMER',
      },
    });

    let createdCase;
    try {
      createdCase = await CasesService.create(
        {
          propertyName: propertyAddress,
          customerName: fullName,
          customerEmail: email,
          customerPhone: data.phone?.trim() || '',
          propertyAddress,
          postcode: data.postcode.trim().toUpperCase(),
          pest: data.pest.trim(),
          location: data.location,
          productId: data.productId || undefined,
        },
        { userId: user.id, role: 'CUSTOMER' }
      );
    } catch (err) {
      await prisma.user.delete({ where: { id: user.id } });
      throw err;
    }

    void sendWelcomeEmail({ email: user.email, fullName: user.fullName });

    const token = AuthService.signToken({ userId: user.id, email: user.email, role: user.role });

    return { user: AuthService.sanitizeUser(user), token, case: createdCase };
  },
};