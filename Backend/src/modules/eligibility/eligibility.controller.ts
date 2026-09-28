import { Request, Response } from 'express';
import { EligibilityService } from './eligibility.service';

export const EligibilityController = {
  async check(req: Request, res: Response) {
    try {
      const result = await EligibilityService.check(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error checking eligibility' });
    }
  },
};
