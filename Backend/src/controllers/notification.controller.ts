import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

// GET /api/v1/notifications
export async function getNotifications(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const notifications = await prisma.notification.findMany({
      where:   { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take:    50,
    });
    res.json({ success: true, data: notifications });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/notifications/:id/read
export async function markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const notification = await prisma.notification.update({
      where: { id: req.params.id },
      data:  { isRead: true },
    });
    res.json({ success: true, data: notification });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/notifications/read-all
export async function markAllAsRead(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user!.id, isRead: false },
      data:  { isRead: true },
    });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    next(err);
  }
}
