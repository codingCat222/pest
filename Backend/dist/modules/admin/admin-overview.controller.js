"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOverviewController = void 0;
const admin_service_1 = require("./admin.service");
exports.AdminOverviewController = {
    async get(_req, res) {
        try {
            const overview = await admin_service_1.AdminService.getOverview();
            res.json(overview);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching overview' });
        }
    },
};
