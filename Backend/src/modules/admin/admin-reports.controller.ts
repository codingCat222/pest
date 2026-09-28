import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

export const AdminReportsController = {
  async casesByPest(_req: Request, res: Response) {
    try {
      const rows = await prisma.case.groupBy({ by: ['pest'], _count: { pest: true } });
      res.json(rows.map((r) => ({ pest: r.pest, count: r._count.pest })));
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error generating report' });
    }
  },

  async casesByStatus(_req: Request, res: Response) {
    try {
      const rows = await prisma.case.groupBy({ by: ['status'], _count: { status: true } });
      res.json(rows.map((r) => ({ status: r.status, count: r._count.status })));
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error generating report' });
    }
  },

  async revenueByMonth(req: Request, res: Response) {
    try {
      const orders = await prisma.order.findMany({ select: { total: true, placedDate: true } });
      const byMonth: Record<string, number> = {};
      for (const order of orders) {
        const key = order.placedDate.toISOString().slice(0, 7); // YYYY-MM
        byMonth[key] = (byMonth[key] ?? 0) + order.total;
      }
      res.json(byMonth);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error generating report' });
    }
  },
};
