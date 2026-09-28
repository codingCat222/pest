import { Router } from 'express';
import { ActivityReportsController } from './activity-reports.controller';
import { authGuard } from '../../common/guards/auth.guard';

const router = Router();

router.use(authGuard);

router.get('/case/:caseId', ActivityReportsController.getForCase);
router.post('/', ActivityReportsController.create);

export default router;
