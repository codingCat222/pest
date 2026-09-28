import { Request, Response } from 'express';
import { OrdersService } from './orders.service';

export const OrdersController = {
  async list(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const orders = await OrdersService.list(user);
      res.json(orders);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching orders' });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const order = await OrdersService.getOne(req.params.id as string, user);
      res.json(order);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching order' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const order = await OrdersService.create(req.body);
      res.status(201).json(order);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error creating order' });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const order = await OrdersService.updateStatus(req.params.id as string, req.body);
      res.json(order);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error updating order' });
    }
  },
};
