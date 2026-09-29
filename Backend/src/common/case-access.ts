import prisma from '../lib/prisma';

export interface AuthedUser {
    userId: string;
    role: string;
}

export function isStaff(user: AuthedUser): boolean {
    return user.role === 'ADMIN' || user.role === 'TECHNICIAN';
}

export async function assertCaseAccess(caseId: string, user: AuthedUser) {
    const caseRecord = await prisma.case.findUnique({ where: { id: caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };
    if (!isStaff(user) && caseRecord.userId !== user.userId) {
        throw { status: 403, message: 'Forbidden: not your case' };
    }
    return caseRecord;
}