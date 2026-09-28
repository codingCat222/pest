import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const JWT_SECRET = process.env.JWT_SECRET as string;
const TOKEN_EXPIRY = '7d';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const AuthService = {
  async register(data: RegisterDto) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw { status: 409, message: 'An account with this email already exists' };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        fullName: data.fullName,
        phone: data.phone,
        role: data.role || 'CUSTOMER',
      },
    });

    const token = this.signToken({ userId: user.id, email: user.email, role: user.role });

    return { user: this.sanitizeUser(user), token };
  },

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      throw { status: 401, message: 'Invalid email or password' };
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

  signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  },

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  },

  sanitizeUser(user: any) {
    const { passwordHash, ...safe } = user;
    return safe;
  },
};
