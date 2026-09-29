import api from './api';
import { CaseRecord, ProofingFinding } from '../types';
import { formatDate } from './format';

interface RawTimelineEntry {
    id: string;
    title: string;
    date: string;
    completed: boolean;
    current: boolean;
    details?: string | null;
    author?: string | null;
}

interface RawPhoto {
    id: string;
    url: string;
}

interface RawProofingQuote {
    id: string;
    reference?: string | null;
    description: string;
    technicianExplanation: string;
    findings?: string | any[] | null;
    materials?: string | null;
    materialsCost?: number | null;
    labourCost?: number | null;
    subtotal?: number | null;
    price?: number | null;
    vat: number;
    total: number;
    validUntil: string;
    status: 'pending' | 'accepted' | 'declined';
    acceptedAt?: string | null;
}

interface RawCase {
    id: string;
    referenceNumber: string;
    propertyName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    propertyAddress: string;
    postcode: string;
    pest: string;
    location: string;
    status: string;
    productName: string;
    deliveryFee: number;
    orderDate: string;
    trackingNumber?: string | null;
    courier?: string | null;
    monitoringDay: number;
    monitoringDaysTotal: number;
    activityReported?: string | null;
    activityNotes?: string | null;
    lastReportedDate?: string | null;
    appointmentDate?: string | null;
    appointmentTime?: string | null;
    appointmentStatus?: string | null;
    technicianName?: string | null;
    technicianNotes?: string | null;
    timelineEntries?: RawTimelineEntry[];
    photos?: RawPhoto[];
    proofingQuote?: RawProofingQuote | null;
    appointments?: { id: string; status: string }[];
}

export interface CreateCasePayload {
    propertyName: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    propertyAddress: string;
    postcode: string;
    pest: string;
    location: string;
    productName: string;
    deliveryFee: number;
    courier?: string;
}

export interface UpdateCaseStatusPayload {
    status: string;
    note?: string;
}

function adaptProofingQuote(raw?: RawProofingQuote | null): CaseRecord['proofingQuote'] {
    if (!raw) return undefined;

    let findings: ProofingFinding[] | undefined;
    if (raw.findings) {
        try {
            const parsed = typeof raw.findings === 'string' ? JSON.parse(raw.findings) : raw.findings;
            findings = Array.isArray(parsed)
                ? parsed.map((f: any, i: number) => ({
                    id: f.id ?? `finding-${i}`,
                    title: f.title ?? f.label ?? 'Finding',
                    description: f.description ?? f.detail ?? '',
                    recommendedWork: f.recommendedWork ?? '',
                    imageUrl: f.imageUrl ?? '',
                    severity: (f.severity ?? 'medium') as ProofingFinding['severity'],
                }))
                : undefined;
        } catch {
            findings = undefined;
        }
    }

    return {
        id: raw.id,
        reference: raw.reference ?? undefined,
        description: raw.description,
        technicianExplanation: raw.technicianExplanation,
        findings,
        materials: raw.materials ?? undefined,
        materialsCost: raw.materialsCost ?? undefined,
        labourCost: raw.labourCost ?? undefined,
        subtotal: raw.subtotal ?? undefined,
        price: raw.price ?? undefined,
        vat: raw.vat,
        total: raw.total,
        validUntil: formatDate(raw.validUntil) ?? raw.validUntil,
        status: raw.status,
        acceptedAt: formatDate(raw.acceptedAt),
    };
}

export function adaptCase(raw: RawCase): CaseRecord {
    return {
        id: raw.id,
        referenceNumber: raw.referenceNumber,
        propertyName: raw.propertyName,
        customerName: raw.customerName,
        customerEmail: raw.customerEmail,
        customerPhone: raw.customerPhone,
        propertyAddress: raw.propertyAddress,
        postcode: raw.postcode,
        pest: raw.pest as CaseRecord['pest'],
        location: raw.location as CaseRecord['location'],
        status: raw.status as CaseRecord['status'],
        productName: raw.productName,
        deliveryFee: raw.deliveryFee,
        orderDate: formatDate(raw.orderDate) ?? raw.orderDate,
        trackingNumber: raw.trackingNumber ?? undefined,
        courier: raw.courier ?? '',
        monitoringDay: raw.monitoringDay,
        monitoringDaysTotal: raw.monitoringDaysTotal,
        activityReported: raw.activityReported ?? undefined,
        activityNotes: raw.activityNotes ?? undefined,
        lastReportedDate: formatDate(raw.lastReportedDate),
        photos: raw.photos?.map((p) => p.url),
        appointmentId: raw.appointments?.find((a) => a.status === 'Scheduled' || a.status === 'Pending')?.id,
        appointmentDate: formatDate(raw.appointmentDate, { weekday: true, utc: true }),
        appointmentTime: raw.appointmentTime ?? undefined,
        appointmentStatus: (raw.appointmentStatus as CaseRecord['appointmentStatus']) ?? undefined,
        technicianName: raw.technicianName ?? undefined,
        technicianNotes: raw.technicianNotes ?? undefined,
        proofingQuote: adaptProofingQuote(raw.proofingQuote),
        timeline: (raw.timelineEntries ?? []).map((t) => ({
            title: t.title,
            date: formatDate(t.date) ?? '',
            completed: t.completed,
            current: t.current,
            details: t.details ?? undefined,
            author: t.author ?? undefined,
        })),
    };
}

export const CasesService = {
    async list(): Promise<CaseRecord[]> {
        const { data } = await api.get<RawCase[]>('/cases');
        return data.map(adaptCase);
    },

    async getById(id: string): Promise<CaseRecord> {
        const { data } = await api.get<RawCase>(`/cases/${id}`);
        return adaptCase(data);
    },

    async create(payload: CreateCasePayload): Promise<CaseRecord> {
        const { data } = await api.post<RawCase>('/cases', payload);
        return adaptCase(data);
    },

    async updateStatus(id: string, payload: UpdateCaseStatusPayload): Promise<CaseRecord> {
        const { data } = await api.patch<RawCase>(`/cases/${id}/status`, payload);
        return adaptCase(data);
    },

    async addTimelineEntry(id: string, title: string, details?: string): Promise<void> {
        await api.post(`/cases/${id}/timeline`, { title, details });
    },
};

export default CasesService;