"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
function serialize(product) {
    return {
        ...product,
        contents: product.contents ? JSON.parse(product.contents) : [],
        instructions: product.instructions ? JSON.parse(product.instructions) : [],
    };
}
exports.ProductsService = {
    async list(filters) {
        const products = await prisma_1.default.product.findMany({
            where: {
                category: filters?.category,
                pestTarget: filters?.pestTarget,
            },
            orderBy: { createdAt: 'desc' },
        });
        return products.map(serialize);
    },
    async getOne(id) {
        const product = await prisma_1.default.product.findUnique({ where: { id } });
        if (!product)
            throw { status: 404, message: 'Product not found' };
        return serialize(product);
    },
    async create(data) {
        const product = await prisma_1.default.product.create({
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
    async update(id, data) {
        const existing = await prisma_1.default.product.findUnique({ where: { id } });
        if (!existing)
            throw { status: 404, message: 'Product not found' };
        const product = await prisma_1.default.product.update({
            where: { id },
            data: {
                ...data,
                contents: data.contents ? JSON.stringify(data.contents) : undefined,
                instructions: data.instructions ? JSON.stringify(data.instructions) : undefined,
            },
        });
        return serialize(product);
    },
    async remove(id) {
        const existing = await prisma_1.default.product.findUnique({ where: { id } });
        if (!existing)
            throw { status: 404, message: 'Product not found' };
        await prisma_1.default.product.delete({ where: { id } });
        return { message: 'Product deleted' };
    },
};
