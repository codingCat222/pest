import prisma from '../../lib/prisma';

export interface CreateActivityReportDto {
  caseId: string;
  activityLevel: string;
  notes?: string;
  photoUrl?: string;
}

export const ActivityReportsService = {
  async getForCase(caseId: string) {
    return prisma.activityReport.findMany({
      where: { caseId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(data: CreateActivityReportDto) {
    const caseRecord = await prisma.case.findUnique({ where: { id: data.caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };

    const report = await prisma.activityReport.create({
      data: {
        caseId: data.caseId,
        activityLevel: data.activityLevel,
        notes: data.notes,
        photoUrl: data.photoUrl,
      },
    });

    await prisma.case.update({
      where: { id: data.caseId },
      data: {
        activityReported: data.activityLevel,
        activityNotes: data.notes,
        lastReportedDate: new Date(),
        status: 'ACTIVITY_REPORTED',
      },
    });

    return report;
  },
};
