import { Router } from 'express';
import { submitEligibility } from '../controllers/eligibility.controller';

const router = Router();

// Public endpoint (no auth needed)
router.post('/', submitEligibility);

export default router;
