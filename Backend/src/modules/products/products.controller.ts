import { Request, Response } from 'express';
import { ProductsService } from './products.service';

export const ProductsController = {
  async list(req: Request, res: Response) {
    try {
      const { category, pestTarget } = req.query as { category?: string; pestTarget?: string };
      const products = await ProductsService.list({ category, pestTarget });
      res.json(products);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching products' });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const product = await ProductsService.getOne(req.params.id as string);
      res.json(product);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching product' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const product = await ProductsService.create(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error creating product' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const product = await ProductsService.update(req.params.id as string, req.body);
      res.json(product);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error updating product' });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const result = await ProductsService.remove(req.params.id as string);
      res.json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error deleting product' });
    }
  },
};
