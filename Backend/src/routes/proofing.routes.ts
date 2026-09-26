import { Router } from 'express';
import { getProofingQuote, respondToQuote, createProofingQuote } from '../controllers/proofing.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/quote/:caseId',           getProofingQuote);
router.post('/quote/:caseId/respond',  respondToQuote);
router.post('/quote',                  requireRole(UserRole.ADMIN, UserRole.TECHNICIAN), createProofingQuote);

export default router;
