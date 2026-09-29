"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cases_routes_1 = __importDefault(require("./modules/cases/cases.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const products_routes_1 = __importDefault(require("./modules/products/products.routes"));
const orders_routes_1 = __importDefault(require("./modules/orders/orders.routes"));
const appointments_routes_1 = __importDefault(require("./modules/appointments/appointments.routes"));
const proofing_routes_1 = __importDefault(require("./modules/proofing/proofing.routes"));
const activity_reports_routes_1 = __importDefault(require("./modules/activity-reports/activity-reports.routes"));
const documents_routes_1 = __importDefault(require("./modules/documents/documents.routes"));
const technicians_routes_1 = __importDefault(require("./modules/technicians/technicians.routes"));
const payments_routes_1 = __importDefault(require("./modules/payments/payments.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const audit_routes_1 = __importDefault(require("./modules/audit/audit.routes"));
const eligibility_routes_1 = __importDefault(require("./modules/eligibility/eligibility.routes"));
const payments_controller_1 = require("./modules/payments/payments.controller");
const app = (0, express_1.default)();
const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()).filter(Boolean);
app.use((0, cors_1.default)({ origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : true }));
// Stripe webhooks need the raw request body to verify the signature, so this
// route is mounted BEFORE express.json() with its own raw body parser.
app.post('/payments/webhook', express_1.default.raw({ type: 'application/json' }), payments_controller_1.PaymentsController.webhook);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.use('/auth', auth_routes_1.default);
app.use('/cases', cases_routes_1.default);
app.use('/products', products_routes_1.default);
app.use('/orders', orders_routes_1.default);
app.use('/appointments', appointments_routes_1.default);
app.use('/proofing', proofing_routes_1.default);
app.use('/activity-reports', activity_reports_routes_1.default);
app.use('/documents', documents_routes_1.default);
app.use('/technicians', technicians_routes_1.default);
app.use('/payments', payments_routes_1.default);
app.use('/admin', admin_routes_1.default);
app.use('/audit', audit_routes_1.default);
app.use('/eligibility', eligibility_routes_1.default);
app.use((req, res) => {
    res.status(404).json({ error: 'Not found', path: req.originalUrl });
});
app.use((err, _req, res, _next) => {
    if (err && typeof err.status === 'number' && err.status < 500) {
        return res.status(err.status).json({ error: err.message || 'Request failed' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});
exports.default = app;
