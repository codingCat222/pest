import api from './api';

export interface PaymentIntentResult {
    clientSecret: string;
    paymentIntentId: string;
}

export const PaymentsService = {
    async createIntent(caseId: string): Promise<PaymentIntentResult> {
        const { data } = await api.post<PaymentIntentResult>('/payments/intent', { caseId });
        return data;
    },

    async confirm(paymentIntentId: string): Promise<void> {
        await api.post('/payments/confirm', { paymentIntentId });
    },
};

export default PaymentsService;