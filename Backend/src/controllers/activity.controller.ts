import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const activitySchema = z.object({
  caseId:        z.string(),
  activityLevel: z.enum(['NO_ACTIVITY', 'LESS_ACTIVITY', 'SAME_ACTIVITY', 'MORE_ACTIVITY', 'NOT_SURE']),
  notes:         z.string().optional(),
});

// POST /api/v1/activity/reports
export async function submitActivityReport(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parsed = activitySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten() });
    }

    const { caseId, activityLevel, notes } = parsed.data;

    // Verify case belongs to user
    const caseRecord = await prisma.case.findUnique({ where: { id: caseId } });
    if (!caseRecord) return res.status(404).json({ success: false, message: 'Case not found' });
    if (caseRecord.customerId !== req.user!.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Create report
    const report = await prisma.activityReport.create({
      data: { caseId, activityLevel, notes },
    });

    // Update case
    await prisma.case.update({
      where: { id: caseId },
      data: {
        activityReported: activityLevel,
        activityNotes:    notes,
        lastReportedDate: new Date(),
        status:           'ACTIVITY_REPORTED',
      },
    });

    // Add timeline event
    await prisma.timelineEvent.create({
      data: {
        caseId,
        title:     `Activity Report: ${activityLevel.replace(/_/g, ' ')}`,
        details:   notes ? `Customer note: "${notes}"` : `Reported: ${activityLevel.replace(/_/g, ' ')}`,
        completed: true,
      },
    });

    res.status(201).json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/activity/reports/:caseId
export async function getActivityReports(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { caseId } = req.params;

    const reports = await prisma.activityReport.findMany({
      where:   { caseId },
      include: { photos: true },
      orderBy: { reportedAt: 'desc' },
    });

    res.json({ success: true, data: reports });
  } catch (err) {
    next(err);
  }
}
