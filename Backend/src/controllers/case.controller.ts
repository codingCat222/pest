import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import { generateReferenceNumber } from '../utils/reference';

const createCaseSchema = z.object({
  pest:             z.string(),
  activityLocation: z.string(),
  duration:         z.string().optional(),
  postcode:         z.string(),
  propertyAddress:  z.string(),
  propertyName:     z.string().optional(),
  sightings:        z.array(z.string()).optional(),
  productId:        z.string().optional(),
});

// GET /api/v1/cases
export async function getCases(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const isAdmin = req.user?.role === UserRole.ADMIN || req.user?.role === UserRole.TECHNICIAN;
    const where = isAdmin ? {} : { customerId: req.user!.id };

    const cases = await prisma.case.findMany({
      where,
      include: {
        customer:     { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        product:      true,
        order:        true,
        appointment:  true,
        proofingQuote: { include: { findings: true } },
        timeline:     { orderBy: { eventDate: 'asc' } },
        activityReports: { orderBy: { reportedAt: 'desc' }, take: 5 },
        sightings:    true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: cases });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/cases/:id
export async function getCaseById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const isAdmin = req.user?.role === UserRole.ADMIN || req.user?.role === UserRole.TECHNICIAN;

    const caseRecord = await prisma.case.findUnique({
      where: { id },
      include: {
        customer:      { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        product:       { include: { productContents: true, instructions: true } },
        order:         true,
        appointment:   true,
        proofingQuote: { include: { findings: { orderBy: { sortOrder: 'asc' } } } },
        timeline:      { orderBy: { eventDate: 'asc' } },
        activityReports: { include: { photos: true }, orderBy: { reportedAt: 'desc' } },
        documents:     true,
        photos:        true,
        sightings:     true,
      },
    });

    if (!caseRecord) {
      return res.status(404).json({ success: false, message: 'Case not found' });
    }

    if (!isAdmin && caseRecord.customerId !== req.user!.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: caseRecord });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/cases
export async function createCase(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parsed = createCaseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten() });
    }

    const { pest, activityLocation, duration, postcode, propertyAddress, propertyName, sightings, productId } = parsed.data;

    const referenceNumber = await generateReferenceNumber();

    const newCase = await prisma.case.create({
      data: {
        referenceNumber,
        propertyName:    propertyName ?? propertyAddress,
        propertyAddress,
        postcode,
        pest:            pest as any,
        activityLocation: activityLocation as any,
        duration:        duration as any,
        customerId:      req.user!.id,
        productId:       productId ?? null,
        status:          'PRODUCT_CLAIMED',
        sightings: sightings ? {
          create: sightings.map((s) => ({ sighting: s })),
        } : undefined,
        timeline: {
          create: [
            { title: 'Eligibility Approved', details: 'Pest questionnaire completed.', completed: true },
            { title: 'Free Product Claimed', details: 'Product allocated at £0.00.', completed: true },
          ],
        },
      },
      include: {
        customer:  { select: { id: true, firstName: true, lastName: true, email: true } },
        product:   true,
        timeline:  true,
        sightings: true,
      },
    });

    res.status(201).json({ success: true, data: newCase });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/cases/:id
export async function updateCase(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const isAdmin = req.user?.role === UserRole.ADMIN || req.user?.role === UserRole.TECHNICIAN;

    const existing = await prisma.case.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: 'Case not found' });
    if (!isAdmin && existing.customerId !== req.user!.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const body = req.body as Record<string, unknown>;
    const allowedFields = [
      'status', 'monitoringDay', 'activityReported', 'activityNotes',
      'technicianName', 'technicianNotes', 'propertyName', 'propertyAddress', 'postcode',
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updateData[field] = body[field];
    }

    const updated = await prisma.case.update({
      where: { id },
      data: updateData,
      include: { timeline: true, appointment: true, proofingQuote: true },
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/cases/:id/timeline
export async function addTimelineEvent(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { title, details, author, completed, isCurrent } = req.body;

    const event = await prisma.timelineEvent.create({
      data: { caseId: id, title, details, author, completed: completed ?? true, isCurrent: isCurrent ?? false },
    });

    res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
}
