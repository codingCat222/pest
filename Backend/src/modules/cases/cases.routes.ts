import { Router } from 'express';
import { CasesController } from './cases.controller';
import { authGuard } from '../../common/guards/auth.guard';
import { auditLog } from '../../common/interceptors/audit-log.interceptor';
import { requireRole } from '../../common/guards/roles.guard';

const router = Router();

// All case routes require a logged-in user
router.use(authGuard);

router.get('/', CasesController.list);
router.get('/:id', CasesController.getOne);
router.post('/', auditLog('Case', 'CREATE'), CasesController.create);
router.patch('/:id', CasesController.update);
router.patch('/:id/status', requireRole('ADMIN', 'TECHNICIAN'), auditLog('Case', 'STATUS_CHANGE'), CasesController.updateStatus);
router.post('/:id/timeline', requireRole('ADMIN', 'TECHNICIAN'), CasesController.addTimelineEntry);
router.get('/:id/timeline', CasesController.getTimeline);

export default router;