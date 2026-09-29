"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechniciansService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
exports.TechniciansService = {
    async list(filters) {
        return prisma_1.default.technician.findMany({
            where: filters?.active !== undefined ? { active: filters.active } : undefined,
            orderBy: { fullName: 'asc' },
        });
    },
    async getOne(id) {
        const technician = await prisma_1.default.technician.findUnique({
            where: { id },
            include: { appointments: true },
        });
        if (!technician)
            throw { status: 404, message: 'Technician not found' };
        return technician;
    },
    async create(data) {
        const existing = await prisma_1.default.technician.findUnique({ where: { email: data.email } });
        if (existing)
            throw { status: 409, message: 'A technician with this email already exists' };
        return prisma_1.default.technician.create({
            data: { fullName: data.fullName, email: data.email, phone: data.phone },
        });
    },
    async update(id, data) {
        const existing = await prisma_1.default.technician.findUnique({ where: { id } });
        if (!existing)
            throw { status: 404, message: 'Technician not found' };
        return prisma_1.default.technician.update({ where: { id }, data });
    },
    async getSchedule(id) {
        const existing = await prisma_1.default.technician.findUnique({ where: { id } });
        if (!existing)
            throw { status: 404, message: 'Technician not found' };
        return prisma_1.default.appointment.findMany({
            where: { technicianId: id },
            include: { case: true },
            orderBy: { date: 'asc' },
        });
    },
};
