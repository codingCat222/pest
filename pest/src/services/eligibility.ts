import api from './api';
import { AuthResponse } from './auth';
import { adaptCase } from './cases';
import { CaseRecord } from '../types';

export interface EligibilityProduct {
    name: string;
    deliveryCost: number;
}

export interface EligibilityCheckResult {
    eligible: boolean;
    reason?: string;
    product?: EligibilityProduct;
}

export interface ClaimPayload {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    propertyAddress: string;
    postcode: string;
    pest: string;
    location: string;
}

export const EligibilityService = {
    async check(pest: string, postcode: string): Promise<EligibilityCheckResult> {
        const { data } = await api.post<EligibilityCheckResult>('/eligibility/check', { pest, postcode });
        return data;
    },

    async claim(payload: ClaimPayload): Promise<{ auth: AuthResponse; case: CaseRecord }> {
        const { data } = await api.post('/eligibility/claim', payload);
        return {
            auth: { user: data.user, token: data.token },
            case: adaptCase(data.case),
        };
    },
};

export default EligibilityService;