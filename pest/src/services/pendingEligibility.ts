import { CreateCasePayload } from './cases';


const KEY = 'pending_eligibility';

export const PendingEligibility = {
    save(payload: CreateCasePayload) {
        sessionStorage.setItem(KEY, JSON.stringify(payload));
    },

    take(): CreateCasePayload | null {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        sessionStorage.removeItem(KEY);
        try {
            return JSON.parse(raw) as CreateCasePayload;
        } catch {
            return null;
        }
    },

    peek(): CreateCasePayload | null {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as CreateCasePayload;
        } catch {
            return null;
        }
    },

    clear() {
        sessionStorage.removeItem(KEY);
    },
};

export default PendingEligibility;