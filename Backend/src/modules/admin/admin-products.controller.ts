import { Request, Response } from 'express';
import { ProductsService } from '../products/products.service';

// Admin product management delegates to the shared ProductsService;
// kept as its own controller so admin-only concerns (e.g. future bulk import)
// can live here without touching the public catalog controller.
export const AdminProductsController = {
  async list(req: Request, res: Response) {
    try {
      const products = await ProductsService.list();
      res.json(products);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message || 'Error fetching products' });
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
