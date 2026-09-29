"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
function generateOrderNumber() {
    const num = Math.floor(10000 + Math.random() * 89999);
    return `ORD-${num}`;
}
exports.OrdersService = {
    async list(requestingUser) {
        const isStaff = requestingUser.role === 'ADMIN' || requestingUser.role === 'TECHNICIAN';
        return prisma_1.default.order.findMany({
            where: isStaff
                ? undefined
                : { case: { userId: requestingUser.userId } },
            include: { case: true },
            orderBy: { placedDate: 'desc' },
        });
    },
    async getOne(id, requestingUser) {
        const order = await prisma_1.default.order.findUnique({
            where: { id },
            include: { case: true },
        });
        if (!order)
            throw { status: 404, message: 'Order not found' };
        const isStaff = requestingUser.role === 'ADMIN' || requestingUser.role === 'TECHNICIAN';
        if (!isStaff && order.case.userId !== requestingUser.userId) {
            throw { status: 403, message: 'Forbidden: not your order' };
        }
        return order;
    },
    async getForCase(caseId) {
        return prisma_1.default.order.findMany({ where: { caseId }, orderBy: { placedDate: 'desc' } });
    },
    async create(data) {
        const caseRecord = await prisma_1.default.case.findUnique({ where: { id: data.caseId } });
        if (!caseRecord)
            throw { status: 404, message: 'Case not found' };
        return prisma_1.default.order.create({
            data: {
                orderNumber: generateOrderNumber(),
                caseId: data.caseId,
                productName: data.productName,
                productPrice: data.productPrice,
                deliveryFee: data.deliveryFee,
                total: data.productPrice + data.deliveryFee,
                propertyAddress: data.propertyAddress,
                carrier: data.carrier,
                status: 'Preparing',
            },
        });
    },
    async updateStatus(id, dto) {
        const existing = await prisma_1.default.order.findUnique({ where: { id } });
        if (!existing)
            throw { status: 404, message: 'Order not found' };
        return prisma_1.default.order.update({
            where: { id },
            data: {
                status: dto.status,
                trackingNumber: dto.trackingNumber,
                carrier: dto.carrier,
                deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : undefined,
            },
        });
    },
};
