"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
exports.AdminService = {
    async getOverview() {
        const [totalCases, activeCases, resolvedCases, totalUsers, totalTechnicians, pendingQuotes, totalOrders] = await Promise.all([
            prisma_1.default.case.count(),
            prisma_1.default.case.count({ where: { status: { notIn: ['RESOLVED', 'CLOSED', 'CANCELLED'] } } }),
            prisma_1.default.case.count({ where: { status: { in: ['RESOLVED', 'CLOSED'] } } }),
            prisma_1.default.user.count(),
            prisma_1.default.technician.count({ where: { active: true } }),
            prisma_1.default.proofingQuote.count({ where: { status: 'pending' } }),
            prisma_1.default.order.count(),
        ]);
        const casesByStatus = await prisma_1.default.case.groupBy({
            by: ['status'],
            _count: { status: true },
        });
        return {
            totalCases,
            activeCases,
            resolvedCases,
            totalUsers,
            totalTechnicians,
            pendingQuotes,
            totalOrders,
            casesByStatus: casesByStatus.map((row) => ({ status: row.status, count: row._count.status })),
        };
    },
};
