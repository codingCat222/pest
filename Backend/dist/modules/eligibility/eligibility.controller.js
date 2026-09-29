"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityController = void 0;
const eligibility_service_1 = require("./eligibility.service");
exports.EligibilityController = {
    async check(req, res) {
        try {
            const result = await eligibility_service_1.EligibilityService.check(req.body);
            res.json(result);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error checking eligibility' });
        }
    },
};
