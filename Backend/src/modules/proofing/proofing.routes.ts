import { Router } from 'express';
import { ProofingController } from './proofing.controller';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';
import { auditLog } from '../../common/interceptors/audit-log.interceptor';

const router = Router();

router.use(authGuard);

router.get('/case/:caseId', ProofingController.getForCase);
router.get('/:id', ProofingController.getOne);
router.post('/', requireRole('ADMIN', 'TECHNICIAN'), ProofingController.create);
router.patch('/:id/respond', auditLog('ProofingQuote', 'RESPOND'), ProofingController.respond);

export default router;