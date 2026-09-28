import prisma from '../../lib/prisma';

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

export const AppointmentsService = {
  async list(requestingUser: { userId: string; role: string }) {
    const isStaff = requestingUser.role === 'ADMIN' || requestingUser.role === 'TECHNICIAN';
    return prisma.appointment.findMany({
      where: isStaff ? undefined : { case: { userId: requestingUser.userId } },
      include: { case: true, technician: true },
      orderBy: { date: 'asc' },
    });
  },

  async getOne(id: string) {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { case: true, technician: true },
    });
    if (!appointment) throw { status: 404, message: 'Appointment not found' };
    return appointment;
  },

  async getForCase(caseId: string) {
    return prisma.appointment.findMany({
      where: { caseId },
      include: { technician: true },
      orderBy: { date: 'asc' },
    });
  },

  async create(data: CreateAppointmentDto) {
    const caseRecord = await prisma.case.findUnique({ where: { id: data.caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };

    return prisma.appointment.create({
      data: {
        caseId: data.caseId,
        technicianId: data.technicianId,
        date: new Date(data.date),
        time: data.time,
        status: 'Scheduled',
      },
      include: { technician: true },
    });
  },

  async update(id: string, data: UpdateAppointmentDto) {
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Appointment not found' };

    return prisma.appointment.update({
      where: { id },
      data: {
        technicianId: data.technicianId,
        date: data.date ? new Date(data.date) : undefined,
        time: data.time,
        status: data.status,
      },
      include: { technician: true },
    });
  },

  async cancel(id: string) {
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Appointment not found' };

    return prisma.appointment.update({
      where: { id },
      data: { status: 'Cancelled' },
    });
  },
};
