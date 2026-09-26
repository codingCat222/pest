import { Router } from 'express';
import { bookAppointment, getAppointment, updateAppointment } from '../controllers/appointment.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.post('/',         bookAppointment);
router.get('/:caseId',   getAppointment);
router.patch('/:id',     requireRole(UserRole.ADMIN, UserRole.TECHNICIAN), updateAppointment);

export default router;
