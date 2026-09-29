import api from './api';
import { ActivityReportSubmission } from '../types';

export const ActivityReportsService = {
    async create(caseId: string, report: Pick<ActivityReportSubmission, 'activityLevel' | 'notes'> & { photoUrl?: string }): Promise<void> {
        await api.post('/activity-reports', {
            caseId,
            activityLevel: report.activityLevel,
            notes: report.notes || undefined,
            photoUrl: report.photoUrl,
        });
    },
};

export default ActivityReportsService;