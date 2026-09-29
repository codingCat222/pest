import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

export const AdminCasesController = {
  async list(req: Request, res: Response) {
    try {
      const { status, search } = req.query as { status?: string; search?: string };
      const cases = await prisma.case.findMany({
        where: {
          status: status || undefined,
          OR: search
            ? [
              { referenceNumber: { contains: search } },
              { customerName: { contains: search } },
              { customerEmail: { contains: search } },
            ]
            : undefined,
        },
        include: { timelineEntries: true, user: { select: { id: true, fullName: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      });
      res.json(cases);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching cases' });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const caseRecord = await prisma.case.findUnique({
        where: { id: req.params.id as string },
        include: {
          timelineEntries: { orderBy: { date: 'asc' } },
          photos: true,
          proofingQuote: true,
          appointments: { include: { technician: true } },
          activityReports: true,
          orders: true,
          documents: true,
          user: { select: { id: true, fullName: true, email: true } },
        },
      });
      if (!caseRecord) return res.status(404).json({ error: 'Case not found' });
      res.json(caseRecord);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching case' });
    }
  },

  async reassignTechnician(req: Request, res: Response) {
    try {
      const { appointmentId, technicianId } = req.body;
      const technician = await prisma.technician.findUnique({ where: { id: technicianId } });
      if (!technician || !technician.active) {
        return res.status(400).json({ error: 'Technician not found or inactive' });
      }
      const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: { technicianId },
        include: { technician: true },
      });
      await prisma.case.update({
        where: { id: appointment.caseId },
        data: {
          technicianName: technician.fullName,
          timelineEntries: {
            create: [{ title: 'Technician Assigned', completed: true, details: `${technician.fullName} will attend your appointment.` }],
          },
        },
      });
      res.json(appointment);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error reassigning technician' });
    }
  },
};