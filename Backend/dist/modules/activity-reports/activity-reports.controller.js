"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityReportsController = void 0;
const activity_reports_service_1 = require("./activity-reports.service");
exports.ActivityReportsController = {
    async getForCase(req, res) {
        try {
            const reports = await activity_reports_service_1.ActivityReportsService.getForCase(req.params.caseId, req.user);
            res.json(reports);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching activity reports' });
        }
    },
    async create(req, res) {
        try {
            const report = await activity_reports_service_1.ActivityReportsService.create(req.body, req.user);
            res.status(201).json(report);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error creating activity report' });
        }
    },
};
