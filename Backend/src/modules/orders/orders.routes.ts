import { Router } from 'express';
import { OrdersController } from './orders.controller';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';

const router = Router();

router.use(authGuard);

router.get('/', OrdersController.list);
router.get('/:id', OrdersController.getOne);
router.post('/', requireRole('ADMIN', 'TECHNICIAN'), OrdersController.create);
router.patch('/:id/status', requireRole('ADMIN', 'TECHNICIAN'), OrdersController.updateStatus);

export default router;
