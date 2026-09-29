import prisma from '../../lib/prisma';
import { AuthedUser, assertCaseAccess } from '../../common/case-access';
import { ACTIVITY_LEVELS } from '../../config/enums';

export interface CreateActivityReportDto {
  caseId: string;
  activityLevel: string;
  notes?: string;
  photoUrl?: string;
}

const MONITORING_STATUSES = ['DELIVERED', 'MONITORING', 'FOLLOW_UP_MONITORING', 'ACTIVITY_REPORTED'];

export const ActivityReportsService = {
  async getForCase(caseId: string, user: AuthedUser) {
    await assertCaseAccess(caseId, user);
    return prisma.activityReport.findMany({
      where: { caseId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(data: CreateActivityReportDto, user: AuthedUser) {
    const caseRecord = await assertCaseAccess(data.caseId, user);

    if (!ACTIVITY_LEVELS.includes(data.activityLevel)) {
      throw { status: 400, message: 'Invalid activity level' };
    }

    const [report] = await prisma.$transaction([
      prisma.activityReport.create({
        data: {
          caseId: data.caseId,
          activityLevel: data.activityLevel,
          notes: data.notes,
          photoUrl: data.photoUrl,
        },
      }),
      prisma.case.update({
        where: { id: data.caseId },
        data: {
          activityReported: data.activityLevel,
          activityNotes: data.notes,
          lastReportedDate: new Date(),
          ...(MONITORING_STATUSES.includes(caseRecord.status) ? { status: 'ACTIVITY_REPORTED' } : {}),
          timelineEntries: {
            create: [
              {
                title: `Activity Report: ${data.activityLevel}`,
                completed: true,
                details: data.notes ? `Customer note: "${data.notes}"` : `Reported: ${data.activityLevel}`,
              },
            ],
          },
        },
      }),
    ]);

    return report;
  },
};