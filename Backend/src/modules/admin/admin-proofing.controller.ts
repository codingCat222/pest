import { Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { ProofingService } from '../proofing/proofing.service';

export const AdminProofingController = {
  async listPending(_req: Request, res: Response) {
    try {
      const quotes = await prisma.proofingQuote.findMany({
        where: { status: 'pending' },
        include: { case: true },
        orderBy: { createdAt: 'desc' },
      });
      res.json(quotes);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching proofing quotes' });
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
};
