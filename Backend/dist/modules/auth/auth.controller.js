"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
exports.AuthController = {
    async register(req, res) {
        try {
            const result = await auth_service_1.AuthService.register(req.body);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Registration failed' });
        }
    },
    async login(req, res) {
        try {
            const result = await auth_service_1.AuthService.login(req.body);
            res.json(result);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Login failed' });
        }
    },
    async logout(_req, res) {
        // Stateless JWT — logout is handled client-side by discarding the token.
        res.json({ message: 'Logged out' });
    },
    async me(req, res) {
        try {
            const userId = req.user.userId;
            const user = await auth_service_1.AuthService.me(userId);
            res.json(user);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Unable to fetch user' });
        }
    },
};
