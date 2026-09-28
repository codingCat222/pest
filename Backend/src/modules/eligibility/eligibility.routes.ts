import { Router } from 'express';
import { EligibilityController } from './eligibility.controller';

const router = Router();

// Public — a prospective customer checks eligibility before creating an account or case.
router.post('/check', EligibilityController.check);

export default router;
