"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPaymentsController = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
// No dedicated Payment ledger table yet — this reports on payment-related
// case/order status instead. Add a Payment model for full transaction history.
exports.AdminPaymentsController = {
    async list(_req, res) {
        try {
            const [awaitingPayment, paid, orders] = await Promise.all([
                prisma_1.default.case.findMany({ where: { status: 'AWAITING_DELIVERY_PAYMENT' } }),
                prisma_1.default.case.findMany({ where: { status: 'DELIVERY_PAID' } }),
                prisma_1.default.order.findMany({ orderBy: { placedDate: 'desc' }, take: 50 }),
            ]);
            res.json({ awaitingPayment, paid, recentOrders: orders });
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching payment data' });
        }
    },
};
