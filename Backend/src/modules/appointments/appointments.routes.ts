import { Router } from 'express';
import { AppointmentsController } from './appointments.controller';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';

const router = Router();

router.use(authGuard);

router.get('/', AppointmentsController.list);
router.get('/:id', AppointmentsController.getOne);
router.post('/', requireRole('ADMIN', 'TECHNICIAN'), AppointmentsController.create);
router.patch('/:id', requireRole('ADMIN', 'TECHNICIAN'), AppointmentsController.update);
router.post('/:id/cancel', requireRole('ADMIN', 'TECHNICIAN'), AppointmentsController.cancel);

export default router;
