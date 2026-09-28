import { Request, Response } from 'express';
import { TechniciansService } from '../technicians/technicians.service';

export const AdminTechniciansController = {
  async list(_req: Request, res: Response) {
    try {
      const technicians = await TechniciansService.list();
      res.json(technicians);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching technicians' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const technician = await TechniciansService.create(req.body);
      res.status(201).json(technician);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error creating technician' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const technician = await TechniciansService.update(req.params.id as string, req.body);
      res.json(technician);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error updating technician' });
    }
  },
};
