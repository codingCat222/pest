import { Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Setup multer storage
const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR ?? 'uploads', 'documents');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename:    (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

export const documentUpload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE_MB ?? '10') * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});

// GET /api/v1/documents?caseId=xxx
export async function getDocuments(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { caseId } = req.query;
    const isAdmin = req.user?.role === UserRole.ADMIN;

    const documents = await prisma.document.findMany({
      where: {
        ...(caseId ? { caseId: caseId as string } : {}),
        ...(!isAdmin ? { case: { customerId: req.user!.id } } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: documents });
  } catch (err) {
    next(err);
  }
}

// POST /api/v1/documents (multipart upload)
export async function uploadDocument(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { caseId, title, category } = req.body;
    const fileUrl = `/uploads/documents/${req.file.filename}`;

    const doc = await prisma.document.create({
      data: {
        caseId,
        title,
        category,
        format:    path.extname(req.file.originalname).slice(1).toUpperCase(),
        url:       fileUrl,
        filename:  req.file.filename,
        sizeBytes: req.file.size,
      },
    });

    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/v1/documents/:id
export async function deleteDocument(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const doc = await prisma.document.findUnique({ where: { id: req.params.id } });
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });

    // Remove file from disk
    const filePath = path.join(process.cwd(), process.env.UPLOAD_DIR ?? 'uploads', 'documents', doc.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await prisma.document.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Document deleted' });
  } catch (err) {
    next(err);
  }
}
