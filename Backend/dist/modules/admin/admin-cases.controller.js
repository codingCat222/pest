"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCasesController = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
exports.AdminCasesController = {
    async list(req, res) {
        try {
            const { status, search } = req.query;
            const cases = await prisma_1.default.case.findMany({
                where: {
                    status: status || undefined,
                    OR: search
                        ? [
                            { referenceNumber: { contains: search } },
                            { customerName: { contains: search } },
                            { customerEmail: { contains: search } },
                        ]
                        : undefined,
                },
                include: { timelineEntries: true, user: { select: { id: true, fullName: true, email: true } } },
                orderBy: { createdAt: 'desc' },
            });
            res.json(cases);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching cases' });
        }
    },
    async getOne(req, res) {
        try {
            const caseRecord = await prisma_1.default.case.findUnique({
                where: { id: req.params.id },
                include: {
                    timelineEntries: { orderBy: { date: 'asc' } },
                    photos: true,
                    proofingQuote: true,
                    appointments: { include: { technician: true } },
                    activityReports: true,
                    orders: true,
                    documents: true,
                    user: { select: { id: true, fullName: true, email: true } },
                },
            });
            if (!caseRecord)
                return res.status(404).json({ error: 'Case not found' });
            res.json(caseRecord);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error fetching case' });
        }
    },
    async reassignTechnician(req, res) {
        try {
            const { appointmentId, technicianId } = req.body;
            const appointment = await prisma_1.default.appointment.update({
                where: { id: appointmentId },
                data: { technicianId },
                include: { technician: true },
            });
            res.json(appointment);
        }
        catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Error reassigning technician' });
        }
    },
};
