import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { UserRole } from '@prisma/client';
import { z } from 'zod';

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName:  z.string().min(1),
  email:     z.string().email(),
  password:  z.string().min(8),
  phone:     z.string().optional(),
});

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

function generateTokens(payload: { id: string; email: string; role: UserRole }) {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as any,
  });
  const refreshToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET!, {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? '30d') as any,
  });
  return { accessToken, refreshToken };
}

// POST /api/v1/auth/register
export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten() });
    }

    const { firstName, lastName, email, password, phone } = parsed.data;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const rounds = parseInt(process.env.BCRYPT_ROUNDS ?? '12');
    const passwordHash = await bcrypt.hash(password, rounds);

    const user = await prisma.user.create({
      data: { firstName, lastName, email, passwordHash, phone, role: UserRole.CUSTOMER },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });

    const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.status(201).json({ success: true, data: { user, ...tokens } });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/auth/login
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten() });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        ...tokens,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/auth/refresh
export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.json({ success: true, data: tokens });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
}

// POST /api/v1/auth/logout
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken: token } = req.body;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        await prisma.user.update({
          where: { id: decoded.id },
          data: { refreshToken: null },
        });
      } catch { /* ignore invalid token */ }
    }
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/auth/me
export async function getMe(req: Request & { user?: { id: string } }, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true, email: true, firstName: true,
        lastName: true, role: true, phone: true,
        isEmailVerified: true, createdAt: true,
      },
    });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/auth/me
export async function updateMe(req: Request & { user?: { id: string } }, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, phone } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { firstName, lastName, phone },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true },
    });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/auth/change-password
export async function changePassword(req: Request & { user?: { id: string } }, res: Response, next: NextFunction) {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const rounds = parseInt(process.env.BCRYPT_ROUNDS ?? '12');
    const passwordHash = await bcrypt.hash(newPassword, rounds);

    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
}
