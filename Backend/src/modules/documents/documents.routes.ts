import { Router } from 'express';
import { DocumentsController } from './documents.controller';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';

const router = Router();

router.use(authGuard);

router.get('/case/:caseId', DocumentsController.getForCase);
router.get('/:id', DocumentsController.getOne);
router.post('/', requireRole('ADMIN', 'TECHNICIAN'), DocumentsController.create);
router.delete('/:id', requireRole('ADMIN'), DocumentsController.remove);

export default router;
