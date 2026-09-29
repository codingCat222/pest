"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminReportsController = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
exports.AdminReportsController = {
    async casesByPest(_req, res) {
        try {
            const rows = await prisma_1.default.case.groupBy({ by: ['pest'], _count: { pest: true } });
            res.json(rows.map((r) => ({ pest: r.pest, count: r._count.pest })));
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error generating report' });
        }
    },
    async casesByStatus(_req, res) {
        try {
            const rows = await prisma_1.default.case.groupBy({ by: ['status'], _count: { status: true } });
            res.json(rows.map((r) => ({ status: r.status, count: r._count.status })));
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error generating report' });
        }
    },
    async revenueByMonth(req, res) {
        try {
            const orders = await prisma_1.default.order.findMany({ select: { total: true, placedDate: true } });
            const byMonth = {};
            for (const order of orders) {
                const key = order.placedDate.toISOString().slice(0, 7); // YYYY-MM
                byMonth[key] = (byMonth[key] ?? 0) + order.total;
            }
            res.json(byMonth);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error generating report' });
        }
    },
};
