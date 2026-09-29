import api from './api';

export const AppointmentsService = {
    async book(caseId: string, isoDate: string, time: string): Promise<void> {
        await api.post('/appointments', { caseId, date: isoDate, time });
    },

    async reschedule(appointmentId: string, isoDate: string, time: string): Promise<void> {
        await api.patch(`/appointments/${appointmentId}`, { date: isoDate, time });
    },

    async cancel(appointmentId: string): Promise<void> {
        await api.post(`/appointments/${appointmentId}/cancel`);
    },
};

export default AppointmentsService;