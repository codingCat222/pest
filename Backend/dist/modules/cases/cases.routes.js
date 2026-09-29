"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cases_controller_1 = require("./cases.controller");
const auth_guard_1 = require("../../common/guards/auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const router = (0, express_1.Router)();
// All case routes require a logged-in user
router.use(auth_guard_1.authGuard);
router.get('/', cases_controller_1.CasesController.list);
router.get('/:id', cases_controller_1.CasesController.getOne);
router.post('/', cases_controller_1.CasesController.create);
router.patch('/:id', cases_controller_1.CasesController.update);
router.patch('/:id/status', (0, roles_guard_1.requireRole)('ADMIN', 'TECHNICIAN'), cases_controller_1.CasesController.updateStatus);
router.post('/:id/timeline', (0, roles_guard_1.requireRole)('ADMIN', 'TECHNICIAN'), cases_controller_1.CasesController.addTimelineEntry);
router.get('/:id/timeline', cases_controller_1.CasesController.getTimeline);
exports.default = router;
