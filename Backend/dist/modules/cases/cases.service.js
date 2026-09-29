"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasesService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const enums_1 = require("../../config/enums");
const case_access_1 = require("../../common/case-access");
function generateReferenceNumber() {
    const num = Math.floor(10000 + Math.random() * 89999);
    return `FPP-${num}`;
}
const CASE_LIST_INCLUDE = {
    timelineEntries: { orderBy: { date: 'asc' } },
    photos: true,
    proofingQuote: true,
    appointments: { include: { technician: true }, orderBy: { date: 'asc' } },
};
exports.CasesService = {
    async list(requestingUser) {
        return prisma_1.default.case.findMany({
            where: (0, case_access_1.isStaff)(requestingUser) ? undefined : { userId: requestingUser.userId },
            include: CASE_LIST_INCLUDE,
            orderBy: { createdAt: 'desc' },
        });
    },
    async getOne(id, requestingUser) {
        const caseRecord = await prisma_1.default.case.findUnique({
            where: { id },
            include: {
                timelineEntries: { orderBy: { date: 'asc' } },
                photos: true,
                proofingQuote: true,
                appointments: { include: { technician: true } },
                activityReports: true,
                orders: true,
                documents: true,
            },
        });
        if (!caseRecord)
            return null;
        if (!(0, case_access_1.isStaff)(requestingUser) && caseRecord.userId !== requestingUser.userId) {
            throw { status: 403, message: 'Forbidden: not your case' };
        }
        return caseRecord;
    },
    async create(data, requestingUser) {
        let ownerId = requestingUser.userId;
        if ((0, case_access_1.isStaff)(requestingUser)) {
            if (data.userId) {
                ownerId = data.userId;
            }
            else {
                const email = data.customerEmail?.trim().toLowerCase();
                const customer = email ? await prisma_1.default.user.findUnique({ where: { email } }) : null;
                ownerId = customer?.id ?? null;
            }
        }
        return prisma_1.default.case.create({
            data: {
                referenceNumber: generateReferenceNumber(),
                propertyName: data.propertyName,
                customerName: data.customerName,
                customerEmail: data.customerEmail?.trim().toLowerCase(),
                customerPhone: data.customerPhone,
                propertyAddress: data.propertyAddress,
                postcode: data.postcode,
                pest: data.pest,
                location: data.location,
                status: 'PRODUCT_CLAIMED',
                productName: data.productName,
                deliveryFee: data.deliveryFee,
                courier: data.courier,
                userId: ownerId,
                timelineEntries: {
                    create: [{ title: 'Product claimed', completed: true }],
                },
            },
            include: CASE_LIST_INCLUDE,
        });
    },
    async updateStatus(id, dto) {
        if (!enums_1.CASE_STATUSES.includes(dto.status)) {
            throw { status: 400, message: `Invalid status "${dto.status}"` };
        }
        const existing = await prisma_1.default.case.findUnique({ where: { id } });
        if (!existing)
            throw { status: 404, message: 'Case not found' };
        return prisma_1.default.case.update({
            where: { id },
            data: {
                status: dto.status,
                timelineEntries: {
                    create: [{ title: `Status changed to ${dto.status}`, completed: true, details: dto.note }],
                },
            },
            include: CASE_LIST_INCLUDE,
        });
    },
    async addTimelineEntry(id, title, details) {
        if (!title || typeof title !== 'string')
            throw { status: 400, message: 'Title is required' };
        const existing = await prisma_1.default.case.findUnique({ where: { id } });
        if (!existing)
            throw { status: 404, message: 'Case not found' };
        return prisma_1.default.timelineEntry.create({
            data: { caseId: id, title, completed: true, details },
        });
    },
    async getTimeline(id, requestingUser) {
        await (0, case_access_1.assertCaseAccess)(id, requestingUser);
        return prisma_1.default.timelineEntry.findMany({
            where: { caseId: id },
            orderBy: { date: 'asc' },
        });
    },
};
