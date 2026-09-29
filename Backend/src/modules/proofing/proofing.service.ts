import prisma from '../../lib/prisma';
import { AuthedUser, assertCaseAccess } from '../../common/case-access';

export interface ProofingFinding {
  label: string;
  detail?: string;
}

export interface CreateProofingQuoteDto {
  caseId: string;
  reference?: string;
  description: string;
  technicianExplanation: string;
  findings?: ProofingFinding[];
  materials?: string;
  materialsCost?: number;
  labourCost?: number;
  vat: number;
  total: number;
  validUntil: string;
}

export interface RespondProofingQuoteDto {
  status: 'accepted' | 'declined';
}

function serialize(quote: any) {
  return {
    ...quote,
    findings: quote.findings ? JSON.parse(quote.findings) : [],
  };
}

export const ProofingService = {
  async getForCase(caseId: string, user: AuthedUser) {
    await assertCaseAccess(caseId, user);
    const quote = await prisma.proofingQuote.findUnique({ where: { caseId } });
    if (!quote) return null;
    return serialize(quote);
  },

  async getOne(id: string, user: AuthedUser) {
    const quote = await prisma.proofingQuote.findUnique({ where: { id } });
    if (!quote) throw { status: 404, message: 'Proofing quote not found' };
    await assertCaseAccess(quote.caseId, user);
    return serialize(quote);
  },

  async create(data: CreateProofingQuoteDto) {
    const caseRecord = await prisma.case.findUnique({ where: { id: data.caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };

    const existingQuote = await prisma.proofingQuote.findUnique({ where: { caseId: data.caseId } });
    if (existingQuote) throw { status: 409, message: 'This case already has a proofing quote' };

    const validUntil = new Date(data.validUntil);
    if (isNaN(validUntil.getTime())) throw { status: 400, message: 'Invalid "valid until" date' };
    if (!data.description?.trim()) throw { status: 400, message: 'Description is required' };

    const materialsCost = data.materialsCost ?? 0;
    const labourCost = data.labourCost ?? 0;
    const subtotal = materialsCost + labourCost;
    const price = subtotal + data.vat;

    const quote = await prisma.proofingQuote.create({
      data: {
        caseId: data.caseId,
        reference: data.reference || `QT-${Math.floor(10000 + Math.random() * 89999)}`,
        description: data.description,
        technicianExplanation: data.technicianExplanation,
        findings: data.findings ? JSON.stringify(data.findings) : undefined,
        materials: data.materials,
        materialsCost,
        labourCost,
        subtotal,
        price,
        vat: data.vat,
        total: price,
        validUntil,
        status: 'pending',
      },
    });

    await prisma.case.update({
      where: { id: data.caseId },
      data: {
        status: 'PROOFING_QUOTE_SENT',
        timelineEntries: {
          create: [
            {
              title: 'Proofing Quote Sent',
              completed: true,
              details: `Quotation for £${price.toFixed(2)} issued, valid until ${validUntil.toLocaleDateString('en-GB')}.`,
            },
          ],
        },
      },
    });

    return serialize(quote);
  },

  async respond(id: string, dto: RespondProofingQuoteDto, user: AuthedUser) {
    const quote = await prisma.proofingQuote.findUnique({ where: { id } });
    if (!quote) throw { status: 404, message: 'Proofing quote not found' };
    await assertCaseAccess(quote.caseId, user);

    if (dto.status !== 'accepted' && dto.status !== 'declined') {
      throw { status: 400, message: 'Status must be "accepted" or "declined"' };
    }
    if (quote.status !== 'pending') {
      throw { status: 409, message: `This quote has already been ${quote.status}` };
    }

    const updated = await prisma.proofingQuote.update({
      where: { id },
      data: {
        status: dto.status,
        acceptedAt: dto.status === 'accepted' ? new Date() : null,
      },
    });

    await prisma.case.update({
      where: { id: quote.caseId },
      data: {
        status: dto.status === 'accepted' ? 'PROOFING_ACCEPTED' : 'PROOFING_RECOMMENDED',
        timelineEntries: {
          create: [
            {
              title: dto.status === 'accepted' ? 'Proofing Quote Accepted' : 'Proofing Quote Declined',
              completed: true,
              details:
                dto.status === 'accepted'
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