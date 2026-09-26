import { Router } from 'express';
import { submitActivityReport, getActivityReports } from '../controllers/activity.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/reports',             submitActivityReport);
router.get('/reports/:caseId',      getActivityReports);

export default router;
