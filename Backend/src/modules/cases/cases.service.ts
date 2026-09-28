import prisma from '../../lib/prisma';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseStatusDto } from './dto/update-case-status.dto';

function generateReferenceNumber(): string {
  const num = Math.floor(10000 + Math.random() * 89999);
  return `FPP-${num}`;
}

export const CasesService = {
  async list(requestingUser: { userId: string; role: string }) {
    const isStaff = requestingUser.role === 'ADMIN' || requestingUser.role === 'TECHNICIAN';
    return prisma.case.findMany({
      where: isStaff ? undefined : { userId: requestingUser.userId },
      include: { timelineEntries: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getOne(id: string, requestingUser: { userId: string; role: string }) {
    const caseRecord = await prisma.case.findUnique({
      where: { id },
      include: {
        timelineEntries: { orderBy: { date: 'asc' } },
        photos: true,
        proofingQuote: true,
        appointments: true,
        activityReports: true,
        orders: true,
        documents: true,
      },
    });

    if (!caseRecord) return null;

    const isStaff = requestingUser.role === 'ADMIN' || requestingUser.role === 'TECHNICIAN';
    const isOwner = caseRecord.userId === requestingUser.userId;

    if (!isStaff && !isOwner) {
      throw { status: 403, message: 'Forbidden: not your case' };
    }

    return caseRecord;
  },

  async create(data: CreateCaseDto, requestingUser: { userId: string }) {
    return prisma.case.create({
      data: {
        referenceNumber: generateReferenceNumber(),
        propertyName: data.propertyName,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        propertyAddress: data.propertyAddress,
        postcode: data.postcode,
        pest: data.pest,
        location: data.location,
        status: 'PRODUCT_CLAIMED',
        productName: data.productName,
        deliveryFee: data.deliveryFee,
        courier: data.courier,
        userId: requestingUser.userId,
        timelineEntries: {
          create: [{ title: 'Product claimed', completed: true }],
        },
      },
      include: { timelineEntries: true },
    });
  },

  async updateStatus(id: string, dto: UpdateCaseStatusDto) {
    return prisma.case.update({
      where: { id },
      data: {
        status: dto.status,
        timelineEntries: {
          create: [{ title: `Status changed to ${dto.status}`, completed: true, details: dto.note }],
        },
      },
      include: { timelineEntries: true },
    });
  },

  async addTimelineEntry(id: string, title: string, details?: string) {
    return prisma.timelineEntry.create({
      data: { caseId: id, title, completed: true, details },
    });
  },

  async getTimeline(id: string) {
    return prisma.timelineEntry.findMany({
      where: { caseId: id },
      orderBy: { date: 'asc' },
    });
  },
};
