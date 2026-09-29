"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const case_access_1 = require("../../common/case-access");
function parseDate(value) {
    const d = new Date(value);
    if (isNaN(d.getTime()))
        throw { status: 400, message: 'Invalid appointment date' };
    return d;
}
function formatForTimeline(d) {
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}
async function syncCaseFromAppointment(caseId) {
    const active = await prisma_1.default.appointment.findFirst({
        where: { caseId, status: { in: ['Scheduled', 'Pending'] } },
        include: { technician: true },
        orderBy: { date: 'asc' },
    });
    const caseRecord = await prisma_1.default.case.findUnique({ where: { id: caseId } });
    if (!caseRecord)
        return;
    if (active) {
        await prisma_1.default.case.update({
            where: { id: caseId },
            data: {
                appointmentDate: active.date,
                appointmentTime: active.time,
                appointmentStatus: active.status,
                technicianName: active.technician?.fullName ?? null,
                status: caseRecord.status === 'PROFESSIONAL_COMPLETED' ? caseRecord.status : 'PROFESSIONAL_BOOKED',
            },
        });
    }
    else {
        await prisma_1.default.case.update({
            where: { id: caseId },
            data: {
                appointmentDate: null,
                appointmentTime: null,
                appointmentStatus: null,
                technicianName: null,
                status: caseRecord.status === 'PROFESSIONAL_BOOKED' ? 'PROFESSIONAL_OFFERED' : caseRecord.status,
            },
        });
    }
}
async function loadAuthorised(id, user) {
    const appointment = await prisma_1.default.appointment.findUnique({
        where: { id },
        include: { case: true, technician: true },
    });
    if (!appointment)
        throw { status: 404, message: 'Appointment not found' };
    if (!(0, case_access_1.isStaff)(user) && appointment.case.userId !== user.userId) {
        throw { status: 403, message: 'Forbidden: not your appointment' };
    }
    return appointment;
}
exports.AppointmentsService = {
    async list(requestingUser) {
        return prisma_1.default.appointment.findMany({
            where: (0, case_access_1.isStaff)(requestingUser) ? undefined : { case: { userId: requestingUser.userId } },
            include: { case: true, technician: true },
            orderBy: { date: 'asc' },
        });
    },
    async getOne(id, user) {
        return loadAuthorised(id, user);
    },
    async getForCase(caseId) {
        return prisma_1.default.appointment.findMany({
            where: { caseId },
            include: { technician: true },
            orderBy: { date: 'asc' },
        });
    },
    async create(data, user) {
        await (0, case_access_1.assertCaseAccess)(data.caseId, user);
        const date = parseDate(data.date);
        if (!data.time)
            throw { status: 400, message: 'Appointment time is required' };
        const existing = await prisma_1.default.appointment.findFirst({
            where: { caseId: data.caseId, status: { in: ['Scheduled', 'Pending'] } },
        });
        if (existing) {
            throw { status: 409, message: 'This case already has an appointment booked' };
        }
        const appointment = await prisma_1.default.appointment.create({
            data: {
                caseId: data.caseId,
                technicianId: (0, case_access_1.isStaff)(user) ? data.technicianId : undefined,
                date,
                time: data.time,
                status: 'Scheduled',
            },
            include: { technician: true },
        });
        await prisma_1.default.timelineEntry.create({
            data: {
                caseId: data.caseId,
                title: 'Professional Service Booked',
                completed: true,
                details: `Appointment confirmed for ${formatForTimeline(date)} (${data.time}).`,
            },
        });
        await syncCaseFromAppointment(data.caseId);
        return appointment;
    },
    async update(id, data, user) {
        const existing = await loadAuthorised(id, user);
        const staff = (0, case_access_1.isStaff)(user);
        const date = data.date ? parseDate(data.date) : undefined;
        const appointment = await prisma_1.default.appointment.update({
            where: { id },
            data: {
                technicianId: staff ? data.technicianId : undefined,
                status: staff ? data.status : undefined,
                date,
                time: data.time,
            },
            include: { technician: true },
        });
        if (date || data.time) {
            await prisma_1.default.timelineEntry.create({
                data: {
                    caseId: existing.caseId,
                    title: 'Appointment Rescheduled',
                    completed: true,
                    details: `Visit moved to ${formatForTimeline(appointment.date)} (${appointment.time}).`,
                },
            });
        }
        await syncCaseFromAppointment(existing.caseId);
        return appointment;
    },
    async cancel(id, user) {
        const existing = await loadAuthorised(id, user);
        const appointment = await prisma_1.default.appointment.update({
            where: { id },
            data: { status: 'Cancelled' },
        });
        await prisma_1.default.timelineEntry.create({
            data: {
                caseId: existing.caseId,
                title: 'Appointment Cancelled',
                completed: true,
                details: (0, case_access_1.isStaff)(user) ? 'Cancelled by our team.' : 'Customer requested cancellation.',
            },
        });
        await syncCaseFromAppointment(existing.caseId);
        return appointment;
    },
};
