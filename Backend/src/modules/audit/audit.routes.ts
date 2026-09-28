import { Router } from 'express';
import { AuditController } from './audit.controller';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';

const router = Router();

router.use(authGuard);
router.use(requireRole('ADMIN'));

router.get('/', AuditController.list);
router.get('/:entityType/:entityId', AuditController.getForEntity);

export default router;
