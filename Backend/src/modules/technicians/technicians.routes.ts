import { Router } from 'express';
import { TechniciansController } from './technicians.controller';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';

const router = Router();

router.use(authGuard);
router.use(requireRole('ADMIN', 'TECHNICIAN'));

router.get('/', TechniciansController.list);
router.get('/:id', TechniciansController.getOne);
router.get('/:id/schedule', TechniciansController.getSchedule);
router.post('/', requireRole('ADMIN'), TechniciansController.create);
router.patch('/:id', requireRole('ADMIN'), TechniciansController.update);

export default router;
