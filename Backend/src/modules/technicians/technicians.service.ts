import prisma from '../../lib/prisma';

export interface CreateTechnicianDto {
  fullName: string;
  email: string;
  phone?: string;
}

export type UpdateTechnicianDto = Partial<CreateTechnicianDto> & { active?: boolean };

export const TechniciansService = {
  async list(filters?: { active?: boolean }) {
    return prisma.technician.findMany({
      where: filters?.active !== undefined ? { active: filters.active } : undefined,
      orderBy: { fullName: 'asc' },
    });
  },

  async getOne(id: string) {
    const technician = await prisma.technician.findUnique({
      where: { id },
      include: { appointments: true },
    });
    if (!technician) throw { status: 404, message: 'Technician not found' };
    return technician;
  },

  async create(data: CreateTechnicianDto) {
    const existing = await prisma.technician.findUnique({ where: { email: data.email } });
    if (existing) throw { status: 409, message: 'A technician with this email already exists' };

    return prisma.technician.create({
      data: { fullName: data.fullName, email: data.email, phone: data.phone },
    });
  },

  async update(id: string, data: UpdateTechnicianDto) {
    const existing = await prisma.technician.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Technician not found' };

    return prisma.technician.update({ where: { id }, data });
  },

  async getSchedule(id: string) {
    const existing = await prisma.technician.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Technician not found' };

    return prisma.appointment.findMany({
      where: { technicianId: id },
      include: { case: true },
      orderBy: { date: 'asc' },
    });
  },
};
