import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authGuard } from '../../common/guards/auth.guard';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', authGuard, AuthController.me);
router.patch('/me', authGuard, AuthController.updateMe);

export default router;