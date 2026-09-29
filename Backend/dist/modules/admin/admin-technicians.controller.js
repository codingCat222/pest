"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTechniciansController = void 0;
const technicians_service_1 = require("../technicians/technicians.service");
exports.AdminTechniciansController = {
    async list(_req, res) {
        try {
            const technicians = await technicians_service_1.TechniciansService.list();
            res.json(technicians);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching technicians' });
        }
    },
    async create(req, res) {
        try {
            const technician = await technicians_service_1.TechniciansService.create(req.body);
            res.status(201).json(technician);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error creating technician' });
        }
    },
    async update(req, res) {
        try {
            const technician = await technicians_service_1.TechniciansService.update(req.params.id, req.body);
            res.json(technician);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error updating technician' });
        }
    },
};
