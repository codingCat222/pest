import { Request, Response } from 'express';
import { ProofingService } from './proofing.service';

export const ProofingController = {
  async getForCase(req: Request, res: Response) {
    try {
      const quote = await ProofingService.getForCase(req.params.caseId as string);
      if (!quote) return res.status(404).json({ error: 'No proofing quote for this case' });
      res.json(quote);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching proofing quote' });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const quote = await ProofingService.getOne(req.params.id as string);
      res.json(quote);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching proofing quote' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const quote = await ProofingService.create(req.body);
      res.status(201).json(quote);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error creating proofing quote' });
    }
  },

  async respond(req: Request, res: Response) {
    try {
      const quote = await ProofingService.respond(req.params.id as string, req.body);
      res.json(quote);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error responding to proofing quote' });
    }
  },
};
