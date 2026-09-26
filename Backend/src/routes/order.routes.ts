import { Router } from 'express';
import { getOrders, getOrderById, updateTracking } from '../controllers/order.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/',                    getOrders);
router.get('/:id',                 getOrderById);
router.patch('/:id/tracking',      requireRole(UserRole.ADMIN), updateTracking);

export default router;
