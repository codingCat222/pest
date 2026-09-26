import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const quoteResponseSchema = z.object({
  action: z.enum(['accept', 'decline']),
});

// GET /api/v1/proofing/quote/:caseId
export async function getProofingQuote(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { caseId } = req.params;

    const quote = await prisma.proofingQuote.findUnique({
      where:   { caseId },
      include: { findings: { orderBy: { sortOrder: 'asc' } } },
    });

    if (!quote) return res.status(404).json({ success: false, message: 'No proofing quote found' });
    res.json({ success: true, data: quote });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/proofing/quote/:caseId/respond
export async function respondToQuote(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { caseId } = req.params;
    const parsed = quoteResponseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten() });
    }

    const { action } = parsed.data;
    const caseRecord = await prisma.case.findUnique({ where: { id: caseId } });
    if (!caseRecord) return res.status(404).json({ success: false, message: 'Case not found' });
    if (caseRecord.customerId !== req.user!.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const newStatus = action === 'accept' ? 'ACCEPTED' : 'DECLINED';
    const caseStatus = action === 'accept' ? 'PROOFING_ACCEPTED' : 'PROFESSIONAL_COMPLETED';

    const quote = await prisma.proofingQuote.update({
      where: { caseId },
      data:  {
        status:     newStatus as any,
        acceptedAt: action === 'accept' ? new Date() : undefined,
      },
    });

    await prisma.case.update({
      where: { id: caseId },
      data:  { status: caseStatus as any },
    });

    await prisma.timelineEvent.create({
      data: {
        caseId,
        title:     action === 'accept' ? 'Proofing Quote Accepted' : 'Proofing Quote Declined',
        details:   action === 'accept'
          ? 'Customer approved the proofing quotation. Work will be scheduled.'
          : 'Customer declined the proofing quotation.',
        completed: true,
      },
    });

    res.json({ success: true, data: quote });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/proofing/quote (Admin creates the quote)
export async function createProofingQuote(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const {
      caseId, reference, description, technicianExplanation,
      materialsCost, labourCost, subtotal, vat, total, validUntil, findings,
    } = req.body;

    const quote = await prisma.proofingQuote.create({
      data: {
        caseId, reference, description, technicianExplanation,
        materialsCost, labourCost, subtotal, vat, total,
        validUntil: new Date(validUntil),
        findings: findings ? {
          create: (findings as any[]).map((f, i) => ({
            title:           f.title,
            description:     f.description,
            recommendedWork: f.recommendedWork,
            imageUrl:        f.imageUrl,
            severity:        f.severity,
            sortOrder:       i,
          })),
        } : undefined,
      },
      include: { findings: true },
    });

    await prisma.case.update({
      where: { id: caseId },
      data:  { status: 'PROOFING_QUOTE_SENT' as any },
    });

    await prisma.timelineEvent.create({
      data: {
        caseId,
        title:     'Proofing Quote Issued',
        details:   `Quotation ${reference} sent to customer.`,
        completed: true,
      },
    });

    res.status(201).json({ success: true, data: quote });
  } catch (err) {
    next(err);
  }
}
