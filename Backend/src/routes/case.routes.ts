import { Router } from 'express';
import { getCases, getCaseById, createCase, updateCase, addTimelineEvent } from '../controllers/case.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/',              getCases);
router.get('/:id',           getCaseById);
router.post('/',             createCase);
router.patch('/:id',         updateCase);
router.post('/:id/timeline', requireRole(UserRole.ADMIN, UserRole.TECHNICIAN), addTimelineEvent);

export default router;
