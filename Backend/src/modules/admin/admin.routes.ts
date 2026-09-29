import { Router } from 'express';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';
import { auditLog } from '../../common/interceptors/audit-log.interceptor';
import { AdminOverviewController } from './admin-overview.controller';
import { AdminCasesController } from './admin-cases.controller';
import { AdminProductsController } from './admin-products.controller';
import { AdminTechniciansController } from './admin-technicians.controller';
import { AdminProofingController } from './admin-proofing.controller';
import { AdminPaymentsController } from './admin-payments.controller';
import { AdminReportsController } from './admin-reports.controller';
import { AdminAuditLogController } from './admin-audit-log.controller';

const router = Router();

// Every admin route requires an authenticated ADMIN user.
router.use(authGuard);
router.use(requireRole('ADMIN'));

router.get('/overview', AdminOverviewController.get);

router.get('/cases', AdminCasesController.list);
router.get('/cases/:id', AdminCasesController.getOne);
router.post('/cases/reassign-technician', auditLog('Appointment', 'REASSIGN_TECHNICIAN'), AdminCasesController.reassignTechnician);

router.get('/products', AdminProductsController.list);
router.post('/products', auditLog('Product', 'CREATE'), AdminProductsController.create);
router.patch('/products/:id', auditLog('Product', 'UPDATE'), AdminProductsController.update);
router.delete('/products/:id', auditLog('Product', 'DELETE'), AdminProductsController.remove);

router.get('/technicians', AdminTechniciansController.list);
router.post('/technicians', auditLog('Technician', 'CREATE'), AdminTechniciansController.create);
router.patch('/technicians/:id', auditLog('Technician', 'UPDATE'), AdminTechniciansController.update);

router.get('/proofing/pending', AdminProofingController.listPending);
router.post('/proofing', auditLog('ProofingQuote', 'CREATE'), AdminProofingController.create);

router.get('/payments', AdminPaymentsController.list);

router.get('/reports/cases-by-pest', AdminReportsController.casesByPest);
router.get('/reports/cases-by-status', AdminReportsController.casesByStatus);
router.get('/reports/revenue-by-month', AdminReportsController.revenueByMonth);

router.get('/audit-log', AdminAuditLogController.list);

export default router;