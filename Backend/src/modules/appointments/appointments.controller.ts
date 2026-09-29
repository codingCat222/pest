import { Request, Response } from 'express';
import { AppointmentsService } from './appointments.service';

export const AppointmentsController = {
  async list(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const appointments = await AppointmentsService.list(user);
      res.json(appointments);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching appointments' });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const appointment = await AppointmentsService.getOne(req.params.id as string, (req as any).user);
      res.json(appointment);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching appointment' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const appointment = await AppointmentsService.create(req.body, (req as any).user);
      res.status(201).json(appointment);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error creating appointment' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const appointment = await AppointmentsService.update(req.params.id as string, req.body, (req as any).user);
      res.json(appointment);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error updating appointment' });
    }
  },

  async cancel(req: Request, res: Response) {
    try {
      const appointment = await AppointmentsService.cancel(req.params.id as string, (req as any).user);
      res.json(appointment);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error cancelling appointment' });
    }
  },
};