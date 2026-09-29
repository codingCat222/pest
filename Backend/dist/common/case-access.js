"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStaff = isStaff;
exports.assertCaseAccess = assertCaseAccess;
const prisma_1 = __importDefault(require("../lib/prisma"));
function isStaff(user) {
    return user.role === 'ADMIN' || user.role === 'TECHNICIAN';
}
async function assertCaseAccess(caseId, user) {
    const caseRecord = await prisma_1.default.case.findUnique({ where: { id: caseId } });
    if (!caseRecord)
        throw { status: 404, message: 'Case not found' };
    if (!isStaff(user) && caseRecord.userId !== user.userId) {
        throw { status: 403, message: 'Forbidden: not your case' };
    }
    return caseRecord;
}
