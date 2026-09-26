import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

// GET /api/v1/products
export async function getProducts(_req: Request, res: Response, next: NextFunction) {
  try {
    const products = await prisma.product.findMany({
      where:   { isActive: true },
      include: { productContents: { orderBy: { sortOrder: 'asc' } }, instructions: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

// GET /api/v1/products/:id
export async function getProductById(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await prisma.product.findUnique({
      where:   { id: req.params.id },
      include: { productContents: { orderBy: { sortOrder: 'asc' } }, instructions: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/products (Admin only)
export async function createProduct(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { name, category, pestTarget, regularPrice, deliveryCost, description, badge, imageUrl, contents, instructions } = req.body;

    const product = await prisma.product.create({
      data: {
        name, category, pestTarget, regularPrice, deliveryCost, description, badge, imageUrl,
        productContents: contents ? { create: (contents as string[]).map((item, i) => ({ item, sortOrder: i })) } : undefined,
        instructions:    instructions ? { create: (instructions as string[]).map((step, i) => ({ step, sortOrder: i })) } : undefined,
      },
      include: { productContents: true, instructions: true },
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}
