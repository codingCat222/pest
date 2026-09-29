import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import casesRoutes from './modules/cases/cases.routes';
import authRoutes from './modules/auth/auth.routes';
import productsRoutes from './modules/products/products.routes';
import ordersRoutes from './modules/orders/orders.routes';
import appointmentsRoutes from './modules/appointments/appointments.routes';
import proofingRoutes from './modules/proofing/proofing.routes';
import activityReportsRoutes from './modules/activity-reports/activity-reports.routes';
import documentsRoutes from './modules/documents/documents.routes';
import techniciansRoutes from './modules/technicians/technicians.routes';
import paymentsRoutes from './modules/payments/payments.routes';
import adminRoutes from './modules/admin/admin.routes';
import auditRoutes from './modules/audit/audit.routes';
import eligibilityRoutes from './modules/eligibility/eligibility.routes';
import { PaymentsController } from './modules/payments/payments.controller';

const app: Express = express();

const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : true }));


app.post('/payments/webhook', express.raw({ type: 'application/json' }), PaymentsController.webhook);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/auth', authRoutes);
app.use('/cases', casesRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/proofing', proofingRoutes);
app.use('/activity-reports', activityReportsRoutes);
app.use('/documents', documentsRoutes);
app.use('/technicians', techniciansRoutes);
app.use('/payments', paymentsRoutes);
app.use('/admin', adminRoutes);
app.use('/audit', auditRoutes);
app.use('/eligibility', eligibilityRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err && typeof err.status === 'number' && err.status < 500) {
        return res.status(err.status).json({ error: err.message || 'Request failed' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;