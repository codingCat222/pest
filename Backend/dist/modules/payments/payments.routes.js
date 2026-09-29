"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_controller_1 = require("./payments.controller");
const auth_guard_1 = require("../../common/guards/auth.guard");
const router = (0, express_1.Router)();
// Stripe webhook needs the raw body — mount this route's raw parser at the
// app level BEFORE express.json(), e.g.:
//   app.post('/payments/webhook', express.raw({ type: 'application/json' }), paymentsRoutes)
// then mount the rest of this router normally for the other endpoints.
router.post('/webhook', payments_controller_1.PaymentsController.webhook);
router.use(auth_guard_1.authGuard);
router.post('/intent', payments_controller_1.PaymentsController.createIntent);
router.post('/confirm', payments_controller_1.PaymentsController.confirm);
exports.default = router;
