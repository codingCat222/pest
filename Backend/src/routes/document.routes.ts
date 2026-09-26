import { Router } from 'express';
import { getDocuments, uploadDocument, deleteDocument, documentUpload } from '../controllers/document.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/',     getDocuments);
router.post('/',    requireRole(UserRole.ADMIN, UserRole.TECHNICIAN), documentUpload.single('file'), uploadDocument);
router.delete('/:id', requireRole(UserRole.ADMIN), deleteDocument);

export default router;
