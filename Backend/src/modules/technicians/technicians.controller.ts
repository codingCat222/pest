import { Request, Response } from 'express';
import { TechniciansService } from './technicians.service';

export const TechniciansController = {
  async list(req: Request, res: Response) {
    try {
      const activeParam = req.query.active as string | undefined;
      const active = activeParam === undefined ? undefined : activeParam === 'true';
      const technicians = await TechniciansService.list({ active });
      res.json(technicians);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching technicians' });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const technician = await TechniciansService.getOne(req.params.id as string);
      res.json(technician);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching technician' });
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

  async getSchedule(req: Request, res: Response) {
    try {
      const schedule = await TechniciansService.getSchedule(req.params.id as string);
      res.json(schedule);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching schedule' });
    }
  },
};
