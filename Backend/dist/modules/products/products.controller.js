"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const products_service_1 = require("./products.service");
exports.ProductsController = {
    async list(req, res) {
        try {
            const { category, pestTarget } = req.query;
            const products = await products_service_1.ProductsService.list({ category, pestTarget });
            res.json(products);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching products' });
        }
    },
    async getOne(req, res) {
        try {
            const product = await products_service_1.ProductsService.getOne(req.params.id);
            res.json(product);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching product' });
        }
    },
    async create(req, res) {
        try {
            const product = await products_service_1.ProductsService.create(req.body);
            res.status(201).json(product);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error creating product' });
        }
    },
    async update(req, res) {
        try {
            const product = await products_service_1.ProductsService.update(req.params.id, req.body);
            res.json(product);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error updating product' });
        }
    },
    async remove(req, res) {
        try {
            const result = await products_service_1.ProductsService.remove(req.params.id);
            res.json(result);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error deleting product' });
        }
    },
};
