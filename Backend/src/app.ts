import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config();

// Route imports
import authRoutes from './routes/auth.routes';
import caseRoutes from './routes/case.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import appointmentRoutes from './routes/appointment.routes';
import activityRoutes from './routes/activity.routes';
import proofingRoutes from './routes/proofing.routes';
import documentRoutes from './routes/document.routes';
import adminRoutes from './routes/admin.routes';
import eligibilityRoutes from './routes/eligibility.routes';
import notificationRoutes from './routes/notification.routes';

// Middleware imports
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { rateLimiter } from './middleware/rateLimiter';

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────

app.use(cors({
  origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);
app.use(rateLimiter);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'pest-control-api',
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────

const API = '/api/v1';

app.use(`${API}/auth`,          authRoutes);
app.use(`${API}/cases`,         caseRoutes);
app.use(`${API}/products`,      productRoutes);
app.use(`${API}/orders`,        orderRoutes);
app.use(`${API}/appointments`,  appointmentRoutes);
app.use(`${API}/activity`,      activityRoutes);
app.use(`${API}/proofing`,      proofingRoutes);
app.use(`${API}/documents`,     documentRoutes);
app.use(`${API}/admin`,         adminRoutes);
app.use(`${API}/eligibility`,   eligibilityRoutes);
app.use(`${API}/notifications`, notificationRoutes);

// ─── 404 & Error Handler ──────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

export default app;
