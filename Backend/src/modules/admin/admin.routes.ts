import { Router } from 'express';
import { authGuard } from '../../common/guards/auth.guard';
import { requireRole } from '../../common/guards/roles.guard';
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
router.post('/cases/reassign-technician', AdminCasesController.reassignTechnician);

router.get('/products', AdminProductsController.list);
router.post('/products', AdminProductsController.create);
router.patch('/products/:id', AdminProductsController.update);
router.delete('/products/:id', AdminProductsController.remove);

router.get('/technicians', AdminTechniciansController.list);
router.post('/technicians', AdminTechniciansController.create);
router.patch('/technicians/:id', AdminTechniciansController.update);

router.get('/proofing/pending', AdminProofingController.listPending);
router.post('/proofing', AdminProofingController.create);

router.get('/payments', AdminPaymentsController.list);

router.get('/reports/cases-by-pest', AdminReportsController.casesByPest);
router.get('/reports/cases-by-status', AdminReportsController.casesByStatus);
router.get('/reports/revenue-by-month', AdminReportsController.revenueByMonth);

router.get('/audit-log', AdminAuditLogController.list);

export default router;
