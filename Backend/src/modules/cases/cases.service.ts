import prisma from '../../lib/prisma';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseStatusDto } from './dto/update-case-status.dto';
import { CASE_STATUSES } from '../../config/enums';
import { AuthedUser, assertCaseAccess, isStaff } from '../../common/case-access';

function generateReferenceNumber(): string {
  const num = Math.floor(10000 + Math.random() * 89999);
  return `FPP-${num}`;
}

const MONITORING_STATUSES = ['DELIVERED', 'MONITORING', 'ACTIVITY_REPORTED', 'FOLLOW_UP_MONITORING'];

function withMonitoringDay<T extends Record<string, any>>(caseRecord: T): T {
  const deliveredAt = (caseRecord.orders as { deliveryDate: Date | null }[] | undefined)?.find((o) => o.deliveryDate)
    ?.deliveryDate;
  if (!deliveredAt || !MONITORING_STATUSES.includes(caseRecord.status)) return caseRecord;

  const total = caseRecord.monitoringDaysTotal || 7;
  const elapsed = Math.floor((Date.now() - new Date(deliveredAt).getTime()) / 86400000) + 1;
  return { ...caseRecord, monitoringDay: Math.min(Math.max(elapsed, 1), total) };
}

const CASE_LIST_INCLUDE = {
  orders: { select: { deliveryDate: true } },
  timelineEntries: { orderBy: { date: 'asc' as const } },
  photos: true,
  proofingQuote: true,
  appointments: { include: { technician: true }, orderBy: { date: 'asc' as const } },
};

export const CasesService = {
  async list(requestingUser: AuthedUser) {
    const rows = await prisma.case.findMany({
      where: isStaff(requestingUser) ? undefined : { userId: requestingUser.userId },
      include: CASE_LIST_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(withMonitoringDay);
  },

  async getOne(id: string, requestingUser: AuthedUser) {
    const caseRecord = await prisma.case.findUnique({
      where: { id },
      include: {
        timelineEntries: { orderBy: { date: 'asc' } },
        photos: true,
        proofingQuote: true,
        appointments: { include: { technician: true } },
        activityReports: true,
        orders: true,
        documents: true,
      },
    });

    if (!caseRecord) return null;

    if (!isStaff(requestingUser) && caseRecord.userId !== requestingUser.userId) {
      throw { status: 403, message: 'Forbidden: not your case' };
    }

    return withMonitoringDay(caseRecord);
  },

  async create(data: CreateCaseDto, requestingUser: AuthedUser) {
    let ownerId: string | null = requestingUser.userId;
    if (isStaff(requestingUser)) {
      if (data.userId) {
        ownerId = data.userId;
      } else {
        const email = data.customerEmail?.trim().toLowerCase();
        const customer = email ? await prisma.user.findUnique({ where: { email } }) : null;
        ownerId = customer?.id ?? null;
      }
    }

    const useCatalogue = !isStaff(requestingUser) || !data.productName || data.deliveryFee === undefined;
    let productName = data.productName;
    let deliveryFee = data.deliveryFee;
    if (useCatalogue) {
      const product = data.productId
        ? await prisma.product.findUnique({ where: { id: data.productId } })
        : await prisma.product.findFirst({ where: { pestTarget: data.pest }, orderBy: { createdAt: 'desc' } });
      if (!product) {
        throw { status: 422, message: `We don't have a free product available for "${data.pest}" yet.` };
      }

      productName = product.name;
      deliveryFee = product.deliveryCost;
    }

    return prisma.case.create({
      data: {
        referenceNumber: generateReferenceNumber(),
        propertyName: data.propertyName,
        customerName: data.customerName,
        customerEmail: data.customerEmail?.trim().toLowerCase(),
        customerPhone: data.customerPhone,
        propertyAddress: data.propertyAddress,
        postcode: data.postcode,
        pest: data.pest,
        location: data.location,
        status: 'PRODUCT_CLAIMED',
        productName: productName as string,
        deliveryFee: deliveryFee as number,
        courier: data.courier,
        userId: ownerId,
        timelineEntries: {
          create: [{ title: 'Product claimed', completed: true }],
        },
      },
      include: CASE_LIST_INCLUDE,
    });
  },

  async updateStatus(id: string, dto: UpdateCaseStatusDto) {
    if (!CASE_STATUSES.includes(dto.status as any)) {
      throw { status: 400, message: `Invalid status "${dto.status}"` };
    }
    const existing = await prisma.case.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Case not found' };

    return prisma.case.update({
      where: { id },
      data: {
        status: dto.status,
        timelineEntries: {
          create: [{ title: `Status changed to ${dto.status}`, completed: true, details: dto.note }],
        },
      },
      include: CASE_LIST_INCLUDE,
    });
  },

  async addTimelineEntry(id: string, title: string, details?: string) {
    if (!title || typeof title !== 'string') throw { status: 400, message: 'Title is required' };
    const existing = await prisma.case.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Case not found' };

    return prisma.timelineEntry.create({
      data: { caseId: id, title, completed: true, details },
    });
  },

  async getTimeline(id: string, requestingUser: AuthedUser) {
    await assertCaseAccess(id, requestingUser);
    return prisma.timelineEntry.findMany({
      where: { caseId: id },
      orderBy: { date: 'asc' },
    });
  },
};