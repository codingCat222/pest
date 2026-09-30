import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const TOKEN_EXPIRY = '7d';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw { status: 500, message: 'Server misconfigured: JWT_SECRET is not set' };
  }
  return secret;
}

function normalizeEmail(email: unknown): string {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

const AVATAR_PATTERN = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const MAX_AVATAR_LENGTH = 300000;

export interface UpdateProfileDto {
  fullName?: string;
  phone?: string | null;
  avatarUrl?: string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function claimUnlinkedCases(userId: string, email: string) {
  await prisma.case.updateMany({
    where: { userId: null, customerEmail: email },
    data: { userId },
  });
}

export const AuthService = {
  async register(data: RegisterDto) {
    const email = normalizeEmail(data.email);
    const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';

    if (!EMAIL_REGEX.test(email)) {
      throw { status: 400, message: 'Please provide a valid email address' };
    }
    if (!fullName) {
      throw { status: 400, message: 'Full name is required' };
    }
    if (typeof data.password !== 'string' || data.password.length < 8) {
      throw { status: 400, message: 'Password must be at least 8 characters' };
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw { status: 409, message: 'An account with this email already exists' };
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

    await claimUnlinkedCases(user.id, email);

    const token = this.signToken({ userId: user.id, email: user.email, role: user.role });

    return { user: this.sanitizeUser(user), token };
  },

  async login(data: LoginDto) {
    const email = normalizeEmail(data.email);
    if (!email || typeof data.password !== 'string' || !data.password) {
      throw { status: 400, message: 'Email and password are required' };
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    if (user.role === 'CUSTOMER') {
      await claimUnlinkedCases(user.id, email);
    }

    const token = this.signToken({ userId: user.id, email: user.email, role: user.role });

    return { user: this.sanitizeUser(user), token };
  },

  async me(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }
    return this.sanitizeUser(user);
  },

  async updateProfile(userId: string, data: UpdateProfileDto) {
    const update: { fullName?: string; phone?: string | null; avatarUrl?: string | null } = {};

    if (data.fullName !== undefined) {
      const fullName = String(data.fullName).trim();
      if (!fullName) throw { status: 400, message: 'Full name cannot be empty' };
      update.fullName = fullName;
    }

    if (data.phone !== undefined) {
      const phone = data.phone === null ? '' : String(data.phone).trim();
      if (phone.length > 30) throw { status: 400, message: 'Phone number is too long' };
      update.phone = phone || null;
    }

    if (data.avatarUrl !== undefined) {
      if (!data.avatarUrl) {
        update.avatarUrl = null;
      } else {
        if (data.avatarUrl.length > MAX_AVATAR_LENGTH || !AVATAR_PATTERN.test(data.avatarUrl)) {
          throw { status: 400, message: 'Profile photo must be a JPG, PNG or WebP image under 200KB' };
        }
        update.avatarUrl = data.avatarUrl;
      }
    }

    if (Object.keys(update).length === 0) {
      throw { status: 400, message: 'Nothing to update' };
    }

    const user = await prisma.user.update({ where: { id: userId }, data: update });
    return this.sanitizeUser(user);
  },

  signToken(payload: JwtPayload): string {
    return jwt.sign(payload, getSecret(), { expiresIn: TOKEN_EXPIRY });
  },

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, getSecret()) as JwtPayload;
  },

  sanitizeUser(user: any) {
    const { passwordHash, ...safe } = user;
    return safe;
  },
};