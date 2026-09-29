"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const stripe_provider_1 = require("./stripe.provider");
const case_access_1 = require("../../common/case-access");
exports.PaymentsService = {
    async createIntent(data, user) {
        const caseRecord = await (0, case_access_1.assertCaseAccess)(data.caseId, user);
        if (!(caseRecord.deliveryFee > 0)) {
            throw { status: 400, message: 'This case has no delivery fee to pay' };
        }
        const intent = await stripe_provider_1.StripeProvider.createPaymentIntent(caseRecord.deliveryFee, data.currency ?? 'gbp', {
            caseId: data.caseId,
        });
        await prisma_1.default.case.update({
            where: { id: data.caseId },
            data: { status: 'AWAITING_DELIVERY_PAYMENT' },
        });
        return {
            clientSecret: intent.client_secret,
            paymentIntentId: intent.id,
        };
    },
    async confirm(data, user) {
        const intent = await stripe_provider_1.StripeProvider.retrievePaymentIntent(data.paymentIntentId);
        if (intent.status !== 'succeeded') {
            throw { status: 400, message: `Payment not completed (status: ${intent.status})` };
        }
        const caseId = intent.metadata?.caseId;
        if (!caseId)
            throw { status: 400, message: 'Payment intent missing case reference' };
        const caseRecord = await (0, case_access_1.assertCaseAccess)(caseId, user);
        if (intent.amount !== Math.round(caseRecord.deliveryFee * 100)) {
            throw { status: 400, message: 'Payment amount does not match the delivery fee' };
        }
        return prisma_1.default.case.update({
            where: { id: caseId },
            data: {
                status: 'DELIVERY_PAID',
                timelineEntries: {
                    create: [{ title: 'Delivery payment received', completed: true }],
                },
            },
            include: { timelineEntries: true },
        });
    },
    async handleWebhookEvent(rawBody, signature) {
        const event = await stripe_provider_1.StripeProvider.constructWebhookEvent(rawBody, signature);
        if (event.type === 'payment_intent.succeeded') {
            const intent = event.data.object;
            const caseId = intent.metadata?.caseId;
            if (caseId) {
                await prisma_1.default.case.update({
                    where: { id: caseId },
                    data: { status: 'DELIVERY_PAID' },
                });
            }
        }
        return { received: true };
    },
};
