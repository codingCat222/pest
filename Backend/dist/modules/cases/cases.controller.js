"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasesController = void 0;
const cases_service_1 = require("./cases.service");
exports.CasesController = {
    async list(req, res) {
        const user = req.user;
        const cases = await cases_service_1.CasesService.list(user);
        res.json(cases);
    },
    async getOne(req, res) {
        const id = req.params.id;
        const user = req.user;
        try {
            const caseRecord = await cases_service_1.CasesService.getOne(id, user);
            if (!caseRecord)
                return res.status(404).json({ error: 'Case not found' });
            res.json(caseRecord);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching case' });
        }
    },
    async create(req, res) {
        const user = req.user;
        const created = await cases_service_1.CasesService.create(req.body, user);
        res.status(201).json(created);
    },
    async update(req, res) {
        res.status(501).json({ error: 'Not implemented yet' });
    },
    async updateStatus(req, res) {
        const id = req.params.id;
        const updated = await cases_service_1.CasesService.updateStatus(id, req.body);
        res.json(updated);
    },
    async addTimelineEntry(req, res) {
        const id = req.params.id;
        const { title, details } = req.body;
        const entry = await cases_service_1.CasesService.addTimelineEntry(id, title, details);
        res.status(201).json(entry);
    },
    async getTimeline(req, res) {
        const id = req.params.id;
        const timeline = await cases_service_1.CasesService.getTimeline(id, req.user);
        res.json(timeline);
    },
};
