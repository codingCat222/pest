import { Router } from 'express';
import { ProductsController } from './products.controller';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';

const router = Router();

// Public catalog browsing
router.get('/', ProductsController.list);
router.get('/:id', ProductsController.getOne);

// Admin-only management
router.post('/', authGuard, requireRole('ADMIN'), ProductsController.create);
router.patch('/:id', authGuard, requireRole('ADMIN'), ProductsController.update);
router.delete('/:id', authGuard, requireRole('ADMIN'), ProductsController.remove);

export default router;
