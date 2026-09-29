"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
exports.AuditService = {
    async log(data) {
        return prisma_1.default.auditLog.create({
            data: {
                userId: data.userId,
                entityType: data.entityType,
                entityId: data.entityId,
                action: data.action,
                details: data.details,
            },
        });
    },
    async list(filters, pagination) {
        const [entries, total] = await Promise.all([
            prisma_1.default.auditLog.findMany({
                where: {
                    entityType: filters.entityType,
                    entityId: filters.entityId,
                    userId: filters.userId,
                },
                include: { user: { select: { id: true, fullName: true, email: true, role: true } } },
                orderBy: { createdAt: 'desc' },
                skip: pagination.skip,
                take: pagination.take,
            }),
            prisma_1.default.auditLog.count({
                where: {
                    entityType: filters.entityType,
                    entityId: filters.entityId,
                    userId: filters.userId,
                },
            }),
        ]);
        return { entries, total };
    },
    async getForEntity(entityType, entityId) {
        return prisma_1.default.auditLog.findMany({
            where: { entityType, entityId },
            include: { user: { select: { id: true, fullName: true, email: true, role: true } } },
            orderBy: { createdAt: 'desc' },
        });
    },
};
