"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const auth_service_1 = require("../../modules/auth/auth.service");
function authGuard(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const token = header.slice('Bearer '.length);
    try {
        const payload = auth_service_1.AuthService.verifyToken(token);
        req.user = payload;
        next();
    }
    catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
