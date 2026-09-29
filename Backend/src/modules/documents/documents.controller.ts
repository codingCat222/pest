import { Request, Response } from 'express';
import { DocumentsService } from './documents.service';

export const DocumentsController = {
  async list(req: Request, res: Response) {
    try {
      const docs = await DocumentsService.list((req as any).user);
      res.json(docs);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching documents' });
    }
  },

  async getForCase(req: Request, res: Response) {
    try {
      const docs = await DocumentsService.getForCase(req.params.caseId as string, (req as any).user);
      res.json(docs);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching documents' });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const doc = await DocumentsService.getOne(req.params.id as string, (req as any).user);
      res.json(doc);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching document' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const doc = await DocumentsService.create(req.body);
      res.status(201).json(doc);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error creating document' });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const result = await DocumentsService.remove(req.params.id as string);
      res.json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error deleting document' });
    }
  },
};