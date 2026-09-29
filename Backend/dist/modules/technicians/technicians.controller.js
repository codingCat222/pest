"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechniciansController = void 0;
const technicians_service_1 = require("./technicians.service");
exports.TechniciansController = {
    async list(req, res) {
        try {
            const activeParam = req.query.active;
            const active = activeParam === undefined ? undefined : activeParam === 'true';
            const technicians = await technicians_service_1.TechniciansService.list({ active });
            res.json(technicians);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching technicians' });
        }
    },
    async getOne(req, res) {
        try {
            const technician = await technicians_service_1.TechniciansService.getOne(req.params.id);
            res.json(technician);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching technician' });
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
    async getSchedule(req, res) {
        try {
            const schedule = await technicians_service_1.TechniciansService.getSchedule(req.params.id);
            res.json(schedule);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching schedule' });
        }
    },
};
