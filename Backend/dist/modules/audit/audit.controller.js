"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditController = void 0;
const audit_service_1 = require("./audit.service");
exports.AuditController = {
    async list(req, res) {
        try {
            const { entityType, entityId, userId, page, pageSize } = req.query;
            const take = pageSize ? parseInt(pageSize, 10) : 25;
            const skip = page ? (parseInt(page, 10) - 1) * take : 0;
            const { entries, total } = await audit_service_1.AuditService.list({ entityType, entityId, userId }, { skip, take });
            res.json({ entries, total, page: page ? parseInt(page, 10) : 1, pageSize: take });
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching audit log' });
        }
    },
    async getForEntity(req, res) {
        try {
            const { entityType, entityId } = req.params;
            const entries = await audit_service_1.AuditService.getForEntity(entityType, entityId);
            res.json(entries);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching audit log' });
        }
    },
};
