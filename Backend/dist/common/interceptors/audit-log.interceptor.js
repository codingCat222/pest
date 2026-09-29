"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLog = auditLog;
const audit_service_1 = require("../../modules/audit/audit.service");
function auditLog(entityType, action) {
    return (req, res, next) => {
        res.on('finish', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const user = req.user;
                const first = (v) => (Array.isArray(v) ? v[0] : v);
                const entityId = first(req.params.id) || first(req.params.caseId) || 'unknown';
                audit_service_1.AuditService.log({
                    userId: user?.userId,
                    entityType,
                    entityId,
                    action,
                    details: JSON.stringify(req.body ?? {}),
                }).catch((err) => {
                    console.error('Failed to write audit log:', err);
                });
            }
        });
        next();
    };
}
