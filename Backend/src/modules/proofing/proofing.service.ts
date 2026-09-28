import prisma from '../../lib/prisma';

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
  async getForCase(caseId: string) {
    const quote = await prisma.proofingQuote.findUnique({ where: { caseId } });
    if (!quote) return null;
    return serialize(quote);
  },

  async getOne(id: string) {
    const quote = await prisma.proofingQuote.findUnique({ where: { id } });
    if (!quote) throw { status: 404, message: 'Proofing quote not found' };
    return serialize(quote);
  },

  async create(data: CreateProofingQuoteDto) {
    const caseRecord = await prisma.case.findUnique({ where: { id: data.caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };

    const materialsCost = data.materialsCost ?? 0;
    const labourCost = data.labourCost ?? 0;
    const subtotal = materialsCost + labourCost;
    const price = subtotal + data.vat;

    const quote = await prisma.proofingQuote.create({
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

    await prisma.case.update({
      where: { id: data.caseId },
      data: { status: 'PROOFING_QUOTE_SENT' },
    });

    return serialize(quote);
  },

  async respond(id: string, dto: RespondProofingQuoteDto) {
    const quote = await prisma.proofingQuote.findUnique({ where: { id } });
    if (!quote) throw { status: 404, message: 'Proofing quote not found' };

    const updated = await prisma.proofingQuote.update({
      where: { id },
      data: {
        status: dto.status,
        acceptedAt: dto.status === 'accepted' ? new Date() : null,
      },
    });

    await prisma.case.update({
      where: { id: quote.caseId },
      data: { status: dto.status === 'accepted' ? 'PROOFING_ACCEPTED' : 'PROOFING_RECOMMENDED' },
    });

    return serialize(updated);
  },
};
