import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

// No dedicated Payment ledger table yet — this reports on payment-related
// case/order status instead. Add a Payment model for full transaction history.
export const AdminPaymentsController = {
  async list(_req: Request, res: Response) {
    try {
      const [awaitingPayment, paid, orders] = await Promise.all([
        prisma.case.findMany({ where: { status: 'AWAITING_DELIVERY_PAYMENT' } }),
        prisma.case.findMany({ where: { status: 'DELIVERY_PAID' } }),
        prisma.order.findMany({ orderBy: { placedDate: 'desc' }, take: 50 }),
      ]);
      res.json({ awaitingPayment, paid, recentOrders: orders });
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching payment data' });
    }
  },
};
