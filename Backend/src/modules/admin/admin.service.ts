import prisma from '../../lib/prisma';

export const AdminService = {
  async getOverview() {
    const [totalCases, activeCases, resolvedCases, totalUsers, totalTechnicians, pendingQuotes, totalOrders] =
      await Promise.all([
        prisma.case.count(),
        prisma.case.count({ where: { status: { notIn: ['RESOLVED', 'CLOSED', 'CANCELLED'] } } }),
        prisma.case.count({ where: { status: { in: ['RESOLVED', 'CLOSED'] } } }),
        prisma.user.count(),
        prisma.technician.count({ where: { active: true } }),
        prisma.proofingQuote.count({ where: { status: 'pending' } }),
        prisma.order.count(),
      ]);

    const casesByStatus = await prisma.case.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    return {
      totalCases,
      activeCases,
      resolvedCases,
      totalUsers,
      totalTechnicians,
      pendingQuotes,
      totalOrders,
      casesByStatus: casesByStatus.map((row) => ({ status: row.status, count: row._count.status })),
    };
  },
};
