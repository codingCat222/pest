import { Router } from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/product.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// Public
router.get('/',    getProducts);
router.get('/:id', getProductById);

// Admin only
router.post('/', authenticate, requireRole(UserRole.ADMIN), createProduct);

export default router;
