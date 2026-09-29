import prisma from '../../lib/prisma';
import { AuthedUser, assertCaseAccess, isStaff } from '../../common/case-access';

export interface CreateAppointmentDto {
  caseId: string;
  technicianId?: string;
  date: string;
  time: string;
}

export interface UpdateAppointmentDto {
  technicianId?: string;
  date?: string;
  time?: string;
  status?: string;
}

function parseDate(value: string): Date {
  const d = new Date(value);
  if (isNaN(d.getTime())) throw { status: 400, message: 'Invalid appointment date' };
  return d;
}

function formatForTimeline(d: Date): string {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

async function syncCaseFromAppointment(caseId: string) {
  const active = await prisma.appointment.findFirst({
    where: { caseId, status: { in: ['Scheduled', 'Pending'] } },
    include: { technician: true },
    orderBy: { date: 'asc' },
  });

  const caseRecord = await prisma.case.findUnique({ where: { id: caseId } });
  if (!caseRecord) return;

  if (active) {
    await prisma.case.update({
      where: { id: caseId },
      data: {
        appointmentDate: active.date,
        appointmentTime: active.time,
        appointmentStatus: active.status,
        technicianName: active.technician?.fullName ?? null,
        status: caseRecord.status === 'PROFESSIONAL_COMPLETED' ? caseRecord.status : 'PROFESSIONAL_BOOKED',
      },
    });
  } else {
    await prisma.case.update({
      where: { id: caseId },
      data: {
        appointmentDate: null,
        appointmentTime: null,
        appointmentStatus: null,
        technicianName: null,
        status: caseRecord.status === 'PROFESSIONAL_BOOKED' ? 'PROFESSIONAL_OFFERED' : caseRecord.status,
      },
    });
  }
}

async function loadAuthorised(id: string, user: AuthedUser) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { case: true, technician: true },
  });
  if (!appointment) throw { status: 404, message: 'Appointment not found' };
  if (!isStaff(user) && appointment.case.userId !== user.userId) {
    throw { status: 403, message: 'Forbidden: not your appointment' };
  }
  return appointment;
}

export const AppointmentsService = {
  async list(requestingUser: AuthedUser) {
    return prisma.appointment.findMany({
      where: isStaff(requestingUser) ? undefined : { case: { userId: requestingUser.userId } },
      include: { case: true, technician: true },
      orderBy: { date: 'asc' },
    });
  },

  async getOne(id: string, user: AuthedUser) {
    return loadAuthorised(id, user);
  },

  async getForCase(caseId: string) {
    return prisma.appointment.findMany({
      where: { caseId },
      include: { technician: true },
      orderBy: { date: 'asc' },
    });
  },

  async create(data: CreateAppointmentDto, user: AuthedUser) {
    await assertCaseAccess(data.caseId, user);
    const date = parseDate(data.date);
    if (!data.time) throw { status: 400, message: 'Appointment time is required' };

    const existing = await prisma.appointment.findFirst({
      where: { caseId: data.caseId, status: { in: ['Scheduled', 'Pending'] } },
    });
    if (existing) {
      throw { status: 409, message: 'This case already has an appointment booked' };
    }

    const appointment = await prisma.appointment.create({
      data: {
        caseId: data.caseId,
        technicianId: isStaff(user) ? data.technicianId : undefined,
        date,
        time: data.time,
        status: 'Scheduled',
      },
      include: { technician: true },
    });

    await prisma.timelineEntry.create({
      data: {
        caseId: data.caseId,
        title: 'Professional Service Booked',
        completed: true,
        details: `Appointment confirmed for ${formatForTimeline(date)} (${data.time}).`,
      },
    });
    await syncCaseFromAppointment(data.caseId);

    return appointment;
  },

  async update(id: string, data: UpdateAppointmentDto, user: AuthedUser) {
    const existing = await loadAuthorised(id, user);
    const staff = isStaff(user);

    const date = data.date ? parseDate(data.date) : undefined;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        technicianId: staff ? data.technicianId : undefined,
        status: staff ? data.status : undefined,
        date,
        time: data.time,
      },
      include: { technician: true },
    });

    if (date || data.time) {
      await prisma.timelineEntry.create({
        data: {
          caseId: existing.caseId,
          title: 'Appointment Rescheduled',
          completed: true,
          details: `Visit moved to ${formatForTimeline(appointment.date)} (${appointment.time}).`,
        },
      });
    }
    await syncCaseFromAppointment(existing.caseId);

    return appointment;
  },

  async cancel(id: string, user: AuthedUser) {
    const existing = await loadAuthorised(id, user);

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status: 'Cancelled' },
    });

    await prisma.timelineEntry.create({
      data: {
        caseId: existing.caseId,
        title: 'Appointment Cancelled',
        completed: true,
        details: isStaff(user) ? 'Cancelled by our team.' : 'Customer requested cancellation.',
      },
    });
    await syncCaseFromAppointment(existing.caseId);

    return appointment;
  },
};