import { Request, Response } from 'express';
import { PaymentsService } from './payments.service';

export const PaymentsController = {
  async createIntent(req: Request, res: Response) {
    try {
      const result = await PaymentsService.createIntent(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error creating payment intent' });
    }
  },

  async confirm(req: Request, res: Response) {
    try {
      const result = await PaymentsService.confirm(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error confirming payment' });
    }
  },

  async webhook(req: Request, res: Response) {
    try {
      const signature = req.headers['stripe-signature'] as string;
      const result = await PaymentsService.handleWebhookEvent(req.body, signature);
      res.json(result);
    } catch (err: any) {
      res.status(err.status || 400).json({ error: err.message || 'Webhook error' });
    }
  },
};
