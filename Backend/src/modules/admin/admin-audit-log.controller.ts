import { Request, Response } from 'express';
import { AuditService } from '../audit/audit.service';

export const AdminAuditLogController = {
  async list(req: Request, res: Response) {
    try {
      const { entityType, entityId, userId, page, pageSize } = req.query as Record<string, string>;
      const take = pageSize ? parseInt(pageSize, 10) : 25;
      const skip = page ? (parseInt(page, 10) - 1) * take : 0;

      const { entries, total } = await AuditService.list(
        { entityType, entityId, userId },
        { skip, take }
      );

      res.json({ entries, total, page: page ? parseInt(page, 10) : 1, pageSize: take });
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching audit log' });
    }
  },
};
