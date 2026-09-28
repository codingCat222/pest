import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../../modules/audit/audit.service';

// Attach after a route handler that sets req.params.id (or another entity id)
// to automatically record who did what. Usage:
//   router.patch('/:id/status', authGuard, auditLog('Case', 'STATUS_CHANGE'), CasesController.updateStatus);
// Fires AFTER the response is sent so it never blocks or breaks the request.
export function auditLog(entityType: string, action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const user = (req as any).user;
        const entityId = req.params.id || req.params.caseId || 'unknown';

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
