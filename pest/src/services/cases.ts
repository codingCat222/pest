import api from './api';
import { CaseRecord } from '../types';

export const CasesService = {
    async list(): Promise<CaseRecord[]> {
        const { data } = await api.get<CaseRecord[]>('/cases');
        return data;
    },

    async getById(id: string): Promise<CaseRecord> {
        const { data } = await api.get<CaseRecord>(`/cases/${id}`);
        return data;
    },
};

export default CasesService;