"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eligibility_controller_1 = require("./eligibility.controller");
const router = (0, express_1.Router)();
// Public — a prospective customer checks eligibility before creating an account or case.
router.post('/check', eligibility_controller_1.EligibilityController.check);
exports.default = router;
