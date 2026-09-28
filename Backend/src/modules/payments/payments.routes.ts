import { Router } from 'express';
import { PaymentsController } from './payments.controller';
import { authGuard } from '../../common/guards/auth.guard';

const router = Router();

// Stripe webhook needs the raw body — mount this route's raw parser at the
// app level BEFORE express.json(), e.g.:
//   app.post('/payments/webhook', express.raw({ type: 'application/json' }), paymentsRoutes)
// then mount the rest of this router normally for the other endpoints.
router.post('/webhook', PaymentsController.webhook);

router.use(authGuard);
router.post('/intent', PaymentsController.createIntent);
router.post('/confirm', PaymentsController.confirm);

export default router;
