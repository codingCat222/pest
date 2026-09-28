import { Request, Response } from 'express';
import { AdminService } from './admin.service';

export const AdminOverviewController = {
  async get(_req: Request, res: Response) {
    try {
      const overview = await AdminService.getOverview();
      res.json(overview);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching overview' });
    }
  },
};
