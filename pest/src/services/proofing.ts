import api from './api';

export const ProofingService = {
    async respond(quoteId: string, status: 'accepted' | 'declined'): Promise<void> {
        await api.patch(`/proofing/${quoteId}/respond`, { status });
    },
};

export default ProofingService;