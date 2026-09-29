"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProductsController = void 0;
const products_service_1 = require("../products/products.service");
// Admin product management delegates to the shared ProductsService;
// kept as its own controller so admin-only concerns (e.g. future bulk import)
// can live here without touching the public catalog controller.
exports.AdminProductsController = {
    async list(req, res) {
        try {
            const products = await products_service_1.ProductsService.list();
            res.json(products);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching products' });
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
