import { Router } from 'express';
import { AppointmentsController } from './appointments.controller';
import { authGuard } from '../../common/guards/auth.guard';

const router = Router();

router.use(authGuard);

router.get('/', AppointmentsController.list);
router.get('/:id', AppointmentsController.getOne);
router.post('/', AppointmentsController.create);
router.patch('/:id', AppointmentsController.update);
router.post('/:id/cancel', AppointmentsController.cancel);

export default router;