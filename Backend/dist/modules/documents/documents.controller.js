"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const documents_service_1 = require("./documents.service");
exports.DocumentsController = {
    async list(req, res) {
        try {
            const docs = await documents_service_1.DocumentsService.list(req.user);
            res.json(docs);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching documents' });
        }
    },
    async getForCase(req, res) {
        try {
            const docs = await documents_service_1.DocumentsService.getForCase(req.params.caseId, req.user);
            res.json(docs);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching documents' });
        }
    },
    async getOne(req, res) {
        try {
            const doc = await documents_service_1.DocumentsService.getOne(req.params.id, req.user);
            res.json(doc);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching document' });
        }
    },
    async create(req, res) {
        try {
            const doc = await documents_service_1.DocumentsService.create(req.body);
            res.status(201).json(doc);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error creating document' });
        }
    },
    async remove(req, res) {
        try {
            const result = await documents_service_1.DocumentsService.remove(req.params.id);
            res.json(result);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error deleting document' });
        }
    },
};
