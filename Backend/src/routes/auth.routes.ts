import { Router } from 'express';
import { register, login, refreshToken, logout, getMe, updateMe, changePassword } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register',         register);
router.post('/login',            login);
router.post('/refresh',          refreshToken);
router.post('/logout',           logout);
router.get('/me',                authenticate, getMe);
router.patch('/me',              authenticate, updateMe);
router.post('/change-password',  authenticate, changePassword);

export default router;
