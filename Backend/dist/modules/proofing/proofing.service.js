"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofingService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const case_access_1 = require("../../common/case-access");
function serialize(quote) {
    return {
        ...quote,
        findings: quote.findings ? JSON.parse(quote.findings) : [],
    };
}
exports.ProofingService = {
    async getForCase(caseId, user) {
        await (0, case_access_1.assertCaseAccess)(caseId, user);
        const quote = await prisma_1.default.proofingQuote.findUnique({ where: { caseId } });
        if (!quote)
            return null;
        return serialize(quote);
    },
    async getOne(id, user) {
        const quote = await prisma_1.default.proofingQuote.findUnique({ where: { id } });
        if (!quote)
            throw { status: 404, message: 'Proofing quote not found' };
        await (0, case_access_1.assertCaseAccess)(quote.caseId, user);
        return serialize(quote);
    },
    async create(data) {
        const caseRecord = await prisma_1.default.case.findUnique({ where: { id: data.caseId } });
        if (!caseRecord)
            throw { status: 404, message: 'Case not found' };
        const materialsCost = data.materialsCost ?? 0;
        const labourCost = data.labourCost ?? 0;
        const subtotal = materialsCost + labourCost;
        const price = subtotal + data.vat;
        const quote = await prisma_1.default.proofingQuote.create({
            data: {
                caseId: data.caseId,
                reference: data.reference,
                description: data.description,
                technicianExplanation: data.technicianExplanation,
                findings: data.findings ? JSON.stringify(data.findings) : undefined,
                materials: data.materials,
                materialsCost,
                labourCost,
                subtotal,
                price,
                vat: data.vat,
                total: data.total ?? price,
                validUntil: new Date(data.validUntil),
                status: 'pending',
            },
        });
        await prisma_1.default.case.update({
            where: { id: data.caseId },
            data: { status: 'PROOFING_QUOTE_SENT' },
        });
        return serialize(quote);
    },
    async respond(id, dto, user) {
        const quote = await prisma_1.default.proofingQuote.findUnique({ where: { id } });
        if (!quote)
            throw { status: 404, message: 'Proofing quote not found' };
        await (0, case_access_1.assertCaseAccess)(quote.caseId, user);
        if (dto.status !== 'accepted' && dto.status !== 'declined') {
            throw { status: 400, message: 'Status must be "accepted" or "declined"' };
        }
        if (quote.status !== 'pending') {
            throw { status: 409, message: `This quote has already been ${quote.status}` };
        }
        const updated = await prisma_1.default.proofingQuote.update({
            where: { id },
            data: {
                status: dto.status,
                acceptedAt: dto.status === 'accepted' ? new Date() : null,
            },
        });
        await prisma_1.default.case.update({
            where: { id: quote.caseId },
            data: {
                status: dto.status === 'accepted' ? 'PROOFING_ACCEPTED' : 'PROOFING_RECOMMENDED',
                timelineEntries: {
                    create: [
                        {
                            title: dto.status === 'accepted' ? 'Proofing Quote Accepted' : 'Proofing Quote Declined',
                            completed: true,
                            details: dto.status === 'accepted'
                                ? `Customer accepted quotation ${quote.reference ?? ''} (£${quote.total.toFixed(2)}).`
                                : `Customer declined quotation ${quote.reference ?? ''}.`,
                        },
                    ],
                },
            },
        });
        return serialize(updated);
    },
};
