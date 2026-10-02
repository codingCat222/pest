import { Request, Response } from 'express';
import { FulfilmentService } from '../fulfilment/fulfilment.service';

export const AdminFulfilmentController = {
    async dispatch(req: Request, res: Response) {
        try {
            const updated = await FulfilmentService.dispatch(req.params.id as string, req.body, (req as any).user);
            res.json(updated);
        } catch (err: any) {
            res.status(err.status || 500).json({ error: err.message || 'Unable to dispatch the order' });
        }
    },

    async deliver(req: Request, res: Response) {
        try {
            const updated = await FulfilmentService.deliver(req.params.id as string, (req as any).user);
            res.json(updated);
        } catch (err: any) {
            res.status(err.status || 500).json({ error: err.message || 'Unable to mark the order as delivered' });
        }
    },
};