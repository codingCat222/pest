"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofingController = void 0;
const proofing_service_1 = require("./proofing.service");
exports.ProofingController = {
    async getForCase(req, res) {
        try {
            const quote = await proofing_service_1.ProofingService.getForCase(req.params.caseId, req.user);
            if (!quote)
                return res.status(404).json({ error: 'No proofing quote for this case' });
            res.json(quote);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching proofing quote' });
        }
    },
    async getOne(req, res) {
        try {
            const quote = await proofing_service_1.ProofingService.getOne(req.params.id, req.user);
            res.json(quote);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching proofing quote' });
        }
    },
    async create(req, res) {
        try {
            const quote = await proofing_service_1.ProofingService.create(req.body);
            res.status(201).json(quote);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error creating proofing quote' });
        }
    },
    async respond(req, res) {
        try {
            const quote = await proofing_service_1.ProofingService.respond(req.params.id, req.body, req.user);
            res.json(quote);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error responding to proofing quote' });
        }
    },
};
