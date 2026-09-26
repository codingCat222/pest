import { Router } from 'express';
import { getAdminDashboard, getAllUsers, updateUserRole, getAllCases } from '../controllers/admin.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate, requireRole(UserRole.ADMIN));

router.get('/dashboard',           getAdminDashboard);
router.get('/users',               getAllUsers);
router.patch('/users/:id/role',    updateUserRole);
router.get('/cases',               getAllCases);

export default router;
