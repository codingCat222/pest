"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const auth_guard_1 = require("../../common/guards/auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const router = (0, express_1.Router)();
// Public catalog browsing
router.get('/', products_controller_1.ProductsController.list);
router.get('/:id', products_controller_1.ProductsController.getOne);
// Admin-only management
router.post('/', auth_guard_1.authGuard, (0, roles_guard_1.requireRole)('ADMIN'), products_controller_1.ProductsController.create);
router.patch('/:id', auth_guard_1.authGuard, (0, roles_guard_1.requireRole)('ADMIN'), products_controller_1.ProductsController.update);
router.delete('/:id', auth_guard_1.authGuard, (0, roles_guard_1.requireRole)('ADMIN'), products_controller_1.ProductsController.remove);
exports.default = router;
