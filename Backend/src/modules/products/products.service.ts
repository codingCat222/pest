import prisma from '../../lib/prisma';
import { PEST_TARGETS } from '../../config/enums';

export interface CreateProductDto {
  name: string;
  category: string;
  pestTarget: string;
  regularPrice: number;
  deliveryCost: number;
  description: string;
  contents: string[];
  instructions: string[];
  safetyNotice: string;
  badge?: string;
  imageUrl?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

function assertPestTarget(value: string) {
  if (!PEST_TARGETS.includes(value)) {
    throw { status: 400, message: `Pest target must be one of: ${PEST_TARGETS.join(', ')}` };
  }
}

function serialize(product: any) {
  return {
    ...product,
    contents: product.contents ? JSON.parse(product.contents) : [],
    instructions: product.instructions ? JSON.parse(product.instructions) : [],
  };
}

export const ProductsService = {
  async list(filters?: { category?: string; pestTarget?: string }) {
    const products = await prisma.product.findMany({
      where: {
        category: filters?.category,
        pestTarget: filters?.pestTarget,
      },
      orderBy: { createdAt: 'desc' },
    });
    return products.map(serialize);
  },

  async getOne(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw { status: 404, message: 'Product not found' };
    return serialize(product);
  },

  async create(data: CreateProductDto) {
    assertPestTarget(data.pestTarget);
    const product = await prisma.product.create({
      data: {
        name: data.name,
        category: data.category,
        pestTarget: data.pestTarget,
        regularPrice: data.regularPrice,
        deliveryCost: data.deliveryCost,
        description: data.description,
        contents: JSON.stringify(data.contents ?? []),
        instructions: JSON.stringify(data.instructions ?? []),
        safetyNotice: data.safetyNotice,
        badge: data.badge,
        imageUrl: data.imageUrl,
      },
    });
    return serialize(product);
  },

  async update(id: string, data: UpdateProductDto) {
    if (data.pestTarget !== undefined) assertPestTarget(data.pestTarget);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Product not found' };

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        contents: data.contents ? JSON.stringify(data.contents) : undefined,
        instructions: data.instructions ? JSON.stringify(data.instructions) : undefined,
      },
    });
    return serialize(product);
  },

  async remove(id: string) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Product not found' };
    await prisma.product.delete({ where: { id } });
    return { message: 'Product deleted' };
  },
};