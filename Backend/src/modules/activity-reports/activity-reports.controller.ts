import { Request, Response } from 'express';
import { ActivityReportsService } from './activity-reports.service';

export const ActivityReportsController = {
  async getForCase(req: Request, res: Response) {
    try {
      const reports = await ActivityReportsService.getForCase(req.params.caseId as string);
      res.json(reports);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching activity reports' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const report = await ActivityReportsService.create(req.body);
      res.status(201).json(report);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error creating activity report' });
    }
  },
};
