import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '@prisma/client';

// GET /api/v1/orders
export async function getOrders(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const isAdmin = req.user?.role === UserRole.ADMIN;
    const orders = await prisma.order.findMany({
      where: isAdmin ? {} : { case: { customerId: req.user!.id } },
      include: {
        case: {
          select: {
            referenceNumber: true,
            propertyAddress: true,
            postcode: true,
            product: { select: { name: true } },
            customer: { select: { firstName: true, lastName: true, email: true } },
          },
        },
      },
      orderBy: { placedAt: 'desc' },
    });
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/orders/:id
export async function getOrderById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const order = await prisma.order.findUnique({
      where:   { id: req.params.id },
      include: { case: { include: { customer: true, product: true } } },
    });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/orders/:id/tracking
export async function updateTracking(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { trackingNumber, carrier, status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data:  { trackingNumber, carrier, status },
    });
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}
