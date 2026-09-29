import prisma from '../../lib/prisma';
import { AuthedUser, assertCaseAccess, isStaff } from '../../common/case-access';

export interface CreateDocumentDto {
  caseId: string;
  title: string;
  category: 'Instructions' | 'Receipt' | 'Report' | 'Quote' | 'Certificate';
  format?: string;
  size?: string;
  fileUrl?: string;
}

export const DocumentsService = {
  async list(user: AuthedUser) {
    return prisma.document.findMany({
      where: isStaff(user) ? undefined : { case: { userId: user.userId } },
      include: { case: { select: { referenceNumber: true } } },
      orderBy: { date: 'desc' },
    });
  },

  async getForCase(caseId: string, user: AuthedUser) {
    await assertCaseAccess(caseId, user);
    return prisma.document.findMany({ where: { caseId }, orderBy: { date: 'desc' } });
  },

  async getOne(id: string, user: AuthedUser) {
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) throw { status: 404, message: 'Document not found' };
    await assertCaseAccess(doc.caseId, user);
    return doc;
  },

  async create(data: CreateDocumentDto) {
    const caseRecord = await prisma.case.findUnique({ where: { id: data.caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };

    return prisma.document.create({
      data: {
        caseId: data.caseId,
        title: data.title,
        category: data.category,
        format: data.format ?? 'PDF',
        size: data.size,
        fileUrl: data.fileUrl,
      },
    });
  },

  async remove(id: string) {
    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Document not found' };
    await prisma.document.delete({ where: { id } });
    return { message: 'Document deleted' };
  },
};