"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const appointments_service_1 = require("./appointments.service");
exports.AppointmentsController = {
    async list(req, res) {
        try {
            const user = req.user;
            const appointments = await appointments_service_1.AppointmentsService.list(user);
            res.json(appointments);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching appointments' });
        }
    },
    async getOne(req, res) {
        try {
            const appointment = await appointments_service_1.AppointmentsService.getOne(req.params.id, req.user);
            res.json(appointment);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching appointment' });
        }
    },
    async create(req, res) {
        try {
            const appointment = await appointments_service_1.AppointmentsService.create(req.body, req.user);
            res.status(201).json(appointment);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error creating appointment' });
        }
    },
    async update(req, res) {
        try {
            const appointment = await appointments_service_1.AppointmentsService.update(req.params.id, req.body, req.user);
            res.json(appointment);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error updating appointment' });
        }
    },
    async cancel(req, res) {
        try {
            const appointment = await appointments_service_1.AppointmentsService.cancel(req.params.id, req.user);
            res.json(appointment);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error cancelling appointment' });
        }
    },
};
