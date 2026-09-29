"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const orders_service_1 = require("./orders.service");
exports.OrdersController = {
    async list(req, res) {
        try {
            const user = req.user;
            const orders = await orders_service_1.OrdersService.list(user);
            res.json(orders);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching orders' });
        }
    },
    async getOne(req, res) {
        try {
            const user = req.user;
            const order = await orders_service_1.OrdersService.getOne(req.params.id, user);
            res.json(order);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching order' });
        }
    },
    async create(req, res) {
        try {
            const order = await orders_service_1.OrdersService.create(req.body);
            res.status(201).json(order);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error creating order' });
        }
    },
    async updateStatus(req, res) {
        try {
            const order = await orders_service_1.OrdersService.updateStatus(req.params.id, req.body);
            res.json(order);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error updating order' });
        }
    },
};
