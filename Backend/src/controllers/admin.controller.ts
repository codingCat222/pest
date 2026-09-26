import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

// GET /api/v1/admin/dashboard
export async function getAdminDashboard(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const [
      totalCases, totalUsers, activeCases,
      totalOrders, recentCases,
    ] = await Promise.all([
      prisma.case.count(),
      prisma.user.count(),
      prisma.case.count({ where: { status: { notIn: ['RESOLVED', 'CLOSED', 'CANCELLED'] } } }),
      prisma.order.count(),
      prisma.case.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: { select: { firstName: true, lastName: true, email: true } },
          order: true,
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        stats: { totalCases, totalUsers, activeCases, totalOrders },
        recentCases,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/admin/users
export async function getAllUsers(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, phone: true, isEmailVerified: true, createdAt: true,
        _count: { select: { cases: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/admin/users/:id/role
export async function updateUserRole(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { role } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data:  { role },
      select: { id: true, email: true, role: true },
    });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/admin/cases (all cases with filters)
export async function getAllCases(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { status, pest, search } = req.query;

    const cases = await prisma.case.findMany({
      where: {
        ...(status ? { status: status as any }          : {}),
        ...(pest   ? { pest: pest as any }              : {}),
        ...(search ? {
          OR: [
            { referenceNumber: { contains: search as string } },
            { postcode:        { contains: search as string } },
            { customer: { email: { contains: search as string } } },
          ],
        } : {}),
      },
      include: {
        customer:    { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        order:       true,
        appointment: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: cases });
  } catch (err) {
    next(err);
  }
}
