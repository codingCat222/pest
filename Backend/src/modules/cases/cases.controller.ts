import { Request, Response } from 'express';
import { CasesService } from './cases.service';

export const CasesController = {
  async list(req: Request, res: Response) {
    const user = (req as any).user;
    const cases = await CasesService.list(user);
    res.json(cases);
  },

  async getOne(req: Request, res: Response) {
    const id = req.params.id as string;
    const user = (req as any).user;
    try {
      const caseRecord = await CasesService.getOne(id, user);
      if (!caseRecord) return res.status(404).json({ error: 'Case not found' });
      res.json(caseRecord);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching case' });
    }
  },

  async create(req: Request, res: Response) {
    const user = (req as any).user;
    const created = await CasesService.create(req.body, user);
    res.status(201).json(created);
  },

  async update(req: Request, res: Response) {
    res.status(501).json({ error: 'Not implemented yet' });
  },

  async updateStatus(req: Request, res: Response) {
    const id = req.params.id as string;
    const updated = await CasesService.updateStatus(id, req.body);
    res.json(updated);
  },

  async addTimelineEntry(req: Request, res: Response) {
    const id = req.params.id as string;
    const { title, details } = req.body;
    const entry = await CasesService.addTimelineEntry(id, title, details);
    res.status(201).json(entry);
  },

  async getTimeline(req: Request, res: Response) {
    const id = req.params.id as string;
    const timeline = await CasesService.getTimeline(id, (req as any).user);
    res.json(timeline);
  },
};