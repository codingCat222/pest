import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const bookSchema = z.object({
  caseId:          z.string(),
  appointmentDate: z.string(), // ISO date string
  appointmentTime: z.string(), // e.g. "10:00 AM"
  technicianName:  z.string().optional(),
});

// POST /api/v1/appointments
export async function bookAppointment(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parsed = bookSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.flatten() });
    }

    const { caseId, appointmentDate, appointmentTime, technicianName } = parsed.data;

    const caseRecord = await prisma.case.findUnique({ where: { id: caseId } });
    if (!caseRecord) return res.status(404).json({ success: false, message: 'Case not found' });
    if (caseRecord.customerId !== req.user!.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Upsert appointment (one per case)
    const appointment = await prisma.appointment.upsert({
      where:  { caseId },
      create: {
        caseId,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        technicianName,
        status: 'SCHEDULED',
      },
      update: {
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        technicianName,
        status: 'SCHEDULED',
      },
    });

    await prisma.case.update({
      where: { id: caseId },
      data:  { status: 'PROFESSIONAL_BOOKED', technicianName },
    });

    await prisma.timelineEvent.create({
      data: {
        caseId,
        title:     'Professional Service Booked',
        details:   `Appointment confirmed for ${appointmentDate} (${appointmentTime})${technicianName ? ` with ${technicianName}` : ''}.`,
        completed: true,
      },
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/appointments/:caseId
export async function getAppointment(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { caseId } = req.params;
    const appointment = await prisma.appointment.findUnique({ where: { caseId } });
    if (!appointment) return res.status(404).json({ success: false, message: 'No appointment found' });
    res.json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/v1/appointments/:id
export async function updateAppointment(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { appointmentDate, appointmentTime, status, notes } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data:  {
        ...(appointmentDate && { appointmentDate: new Date(appointmentDate) }),
        ...(appointmentTime && { appointmentTime }),
        ...(status          && { status }),
        ...(notes           && { notes }),
      },
    });

    res.json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
}
