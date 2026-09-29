"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const case_access_1 = require("../../common/case-access");
exports.DocumentsService = {
    async list(user) {
        return prisma_1.default.document.findMany({
            where: (0, case_access_1.isStaff)(user) ? undefined : { case: { userId: user.userId } },
            include: { case: { select: { referenceNumber: true } } },
            orderBy: { date: 'desc' },
        });
    },
    async getForCase(caseId, user) {
        await (0, case_access_1.assertCaseAccess)(caseId, user);
        return prisma_1.default.document.findMany({ where: { caseId }, orderBy: { date: 'desc' } });
    },
    async getOne(id, user) {
        const doc = await prisma_1.default.document.findUnique({ where: { id } });
        if (!doc)
            throw { status: 404, message: 'Document not found' };
        await (0, case_access_1.assertCaseAccess)(doc.caseId, user);
        return doc;
    },
    async create(data) {
        const caseRecord = await prisma_1.default.case.findUnique({ where: { id: data.caseId } });
        if (!caseRecord)
            throw { status: 404, message: 'Case not found' };
        return prisma_1.default.document.create({
            data: {
                caseId: data.caseId,
                title: data.title,
                category: data.category,
                format: data.format ?? 'PDF',
                size: data.size,
                fileUrl: data.fileUrl,
            },
        });
    },
    async remove(id) {
        const existing = await prisma_1.default.document.findUnique({ where: { id } });
        if (!existing)
            throw { status: 404, message: 'Document not found' };
        await prisma_1.default.document.delete({ where: { id } });
        return { message: 'Document deleted' };
    },
};
