import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../../modules/audit/audit.service';

export function auditLog(entityType: string, action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const user = (req as any).user;
        const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
        const entityId = first(req.params.id) || first(req.params.caseId) || 'unknown';

        AuditService.log({
          userId: user?.userId,
          entityType,
          entityId,
          action,
          details: JSON.stringify(req.body ?? {}),
        }).catch((err) => {
          console.error('Failed to write audit log:', err);
        });
      }
    });
    next();
  };
}