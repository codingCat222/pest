"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityReportsService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const case_access_1 = require("../../common/case-access");
const enums_1 = require("../../config/enums");
const MONITORING_STATUSES = ['DELIVERED', 'MONITORING', 'FOLLOW_UP_MONITORING', 'ACTIVITY_REPORTED'];
exports.ActivityReportsService = {
    async getForCase(caseId, user) {
        await (0, case_access_1.assertCaseAccess)(caseId, user);
        return prisma_1.default.activityReport.findMany({
            where: { caseId },
            orderBy: { createdAt: 'desc' },
        });
    },
    async create(data, user) {
        const caseRecord = await (0, case_access_1.assertCaseAccess)(data.caseId, user);
        if (!enums_1.ACTIVITY_LEVELS.includes(data.activityLevel)) {
            throw { status: 400, message: 'Invalid activity level' };
        }
        const [report] = await prisma_1.default.$transaction([
            prisma_1.default.activityReport.create({
                data: {
                    caseId: data.caseId,
                    activityLevel: data.activityLevel,
                    notes: data.notes,
                    photoUrl: data.photoUrl,
                },
            }),
            prisma_1.default.case.update({
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
