"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProofingController = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const proofing_service_1 = require("../proofing/proofing.service");
exports.AdminProofingController = {
    async listPending(_req, res) {
        try {
            const quotes = await prisma_1.default.proofingQuote.findMany({
                where: { status: 'pending' },
                include: { case: true },
                orderBy: { createdAt: 'desc' },
            });
            res.json(quotes);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching proofing quotes' });
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
};
