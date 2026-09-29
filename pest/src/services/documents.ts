import api from './api';
import { DocumentItem } from '../types';
import { formatDate } from './format';

interface RawDocument {
    id: string;
    title: string;
    category: DocumentItem['category'];
    format?: string | null;
    date: string;
    size?: string | null;
    fileUrl?: string | null;
    case?: { referenceNumber: string } | null;
}

function adaptDocument(raw: RawDocument): DocumentItem {
    return {
        id: raw.id,
        title: raw.title,
        category: raw.category,
        format: 'PDF',
        date: formatDate(raw.date) ?? raw.date,
        size: raw.size ?? '',
        caseRef: raw.case?.referenceNumber ?? '',
        fileUrl: raw.fileUrl ?? undefined,
    };
}

export const DocumentsService = {
    async list(): Promise<DocumentItem[]> {
        const { data } = await api.get<RawDocument[]>('/documents');
        return data.map(adaptDocument);
    },
};

export default DocumentsService;