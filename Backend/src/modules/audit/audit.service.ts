import prisma from '../../lib/prisma';

export interface CreateAuditLogDto {
  userId?: string;
  entityType: string;
  entityId: string;
  action: string;
  details?: string;
}

export interface AuditLogFilters {
  entityType?: string;
  entityId?: string;
  userId?: string;
}

export const AuditService = {
  async log(data: CreateAuditLogDto) {
    return prisma.auditLog.create({
      data: {
        userId: data.userId,
        entityType: data.entityType,
        entityId: data.entityId,
        action: data.action,
        details: data.details,
      },
    });
  },

  async list(filters: AuditLogFilters, pagination: { skip?: number; take?: number }) {
    const [entries, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: {
          entityType: filters.entityType,
          entityId: filters.entityId,
          userId: filters.userId,
        },
        include: { user: { select: { id: true, fullName: true, email: true, role: true } } },
        orderBy: { createdAt: 'desc' },
        skip: pagination.skip,
        take: pagination.take,
      }),
      prisma.auditLog.count({
        where: {
          entityType: filters.entityType,
          entityId: filters.entityId,
          userId: filters.userId,
        },
      }),
    ]);

    return { entries, total };
  },

  async getForEntity(entityType: string, entityId: string) {
    return prisma.auditLog.findMany({
      where: { entityType, entityId },
      include: { user: { select: { id: true, fullName: true, email: true, role: true } } },
      orderBy: { createdAt: 'desc' },
    });
  },
};
