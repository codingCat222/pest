import api from './api';
import { adaptCase } from './cases';
import { CaseRecord, ProductItem } from '../types';

export interface AdminOverview {
    totalCases: number;
    activeCases: number;
    resolvedCases: number;
    totalUsers: number;
    totalTechnicians: number;
    pendingQuotes: number;
    totalOrders: number;
    casesByStatus: { status: string; count: number }[];
}

export interface AdminCaseFilters {
    status?: string;
    search?: string;
}

export interface Technician {
    id: string;
    fullName: string;
    email: string;
    phone?: string | null;
    active: boolean;
    createdAt: string;
}

export interface CreateTechnicianPayload {
    fullName: string;
    email: string;
    phone?: string;
}

export type UpdateTechnicianPayload = Partial<CreateTechnicianPayload> & { active?: boolean };

export interface CreateProductPayload {
    name: string;
    category: string;
    pestTarget: string;
    regularPrice: number;
    deliveryCost: number;
    description: string;
    contents: string[];
    instructions: string[];
    safetyNotice: string;
    badge?: string;
    imageUrl?: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface PaymentsSnapshot {
    awaitingPayment: any[];
    paid: any[];
    recentOrders: any[];
}

export interface AuditLogEntry {
    id: string;
    userId?: string | null;
    user?: { id: string; fullName: string; email: string; role: string } | null;
    entityType: string;
    entityId: string;
    action: string;
    details?: string | null;
    createdAt: string;
}

export interface AuditLogFilters {
    entityType?: string;
    entityId?: string;
    userId?: string;
    page?: number;
    pageSize?: number;
}

export interface AuditLogResult {
    entries: AuditLogEntry[];
    total: number;
    page: number;
    pageSize: number;
}

export const AdminService = {
    async getOverview(): Promise<AdminOverview> {
        const { data } = await api.get<AdminOverview>('/admin/overview');
        return data;
    },

    async listCases(filters?: AdminCaseFilters): Promise<CaseRecord[]> {
        const { data } = await api.get('/admin/cases', { params: filters });
        return data.map(adaptCase);
    },

    async getCase(id: string): Promise<CaseRecord> {
        const { data } = await api.get(`/admin/cases/${id}`);
        return adaptCase(data);
    },

    async reassignTechnician(appointmentId: string, technicianId: string) {
        const { data } = await api.post('/admin/cases/reassign-technician', {
            appointmentId,
            technicianId,
        });
        return data;
    },

    async dispatchCase(caseId: string, payload: { courier: string; trackingNumber?: string }): Promise<CaseRecord> {
        const { data } = await api.post(`/admin/cases/${caseId}/dispatch`, payload);
        return adaptCase(data);
    },

    async deliverCase(caseId: string): Promise<CaseRecord> {
        const { data } = await api.post(`/admin/cases/${caseId}/deliver`);
        return adaptCase(data);
    },

    async listProducts(): Promise<ProductItem[]> {
        const { data } = await api.get<ProductItem[]>('/admin/products');
        return data;
    },

    async createProduct(payload: CreateProductPayload): Promise<ProductItem> {
        const { data } = await api.post<ProductItem>('/admin/products', payload);
        return data;
    },

    async updateProduct(id: string, payload: UpdateProductPayload): Promise<ProductItem> {
        const { data } = await api.patch<ProductItem>(`/admin/products/${id}`, payload);
        return data;
    },

    async deleteProduct(id: string): Promise<void> {
        await api.delete(`/admin/products/${id}`);
    },

    async listTechnicians(): Promise<Technician[]> {
        const { data } = await api.get<Technician[]>('/admin/technicians');
        return data;
    },

    async createTechnician(payload: CreateTechnicianPayload): Promise<Technician> {
        const { data } = await api.post<Technician>('/admin/technicians', payload);
        return data;
    },

    async updateTechnician(id: string, payload: UpdateTechnicianPayload): Promise<Technician> {
        const { data } = await api.patch<Technician>(`/admin/technicians/${id}`, payload);
        return data;
    },

    async listPendingProofingQuotes() {
        const { data } = await api.get('/admin/proofing/pending');
        return data;
    },

    async createProofingQuote(payload: any) {
        const { data } = await api.post('/admin/proofing', payload);
        return data;
    },

    async getPayments(): Promise<PaymentsSnapshot> {
        const { data } = await api.get<PaymentsSnapshot>('/admin/payments');
        return data;
    },

    async getCasesByPest(): Promise<{ pest: string; count: number }[]> {
        const { data } = await api.get('/admin/reports/cases-by-pest');
        return data;
    },

    async getCasesByStatus(): Promise<{ status: string; count: number }[]> {
        const { data } = await api.get('/admin/reports/cases-by-status');
        return data;
    },

    async getRevenueByMonth(): Promise<Record<string, number>> {
        const { data } = await api.get('/admin/reports/revenue-by-month');
        return data;
    },

    async getAuditLog(filters?: AuditLogFilters): Promise<AuditLogResult> {
        const { data } = await api.get<AuditLogResult>('/admin/audit-log', { params: filters });
        return data;
    },
};

export default AdminService;