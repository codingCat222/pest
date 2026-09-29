"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const payments_service_1 = require("./payments.service");
exports.PaymentsController = {
    async createIntent(req, res) {
        try {
            const result = await payments_service_1.PaymentsService.createIntent(req.body, req.user);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error creating payment intent' });
        }
    },
    async confirm(req, res) {
        try {
            const result = await payments_service_1.PaymentsService.confirm(req.body, req.user);
            res.json(result);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error confirming payment' });
        }
    },
    async webhook(req, res) {
        try {
            const signature = req.headers['stripe-signature'];
            const result = await payments_service_1.PaymentsService.handleWebhookEvent(req.body, signature);
            res.json(result);
        }
        catch (err) {
            res.status(err.status || 400).json({ error: err.message || 'Webhook error' });
        }
    },
};
