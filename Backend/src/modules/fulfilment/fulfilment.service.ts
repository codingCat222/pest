import prisma from '../../lib/prisma';
import { AuthedUser } from '../../common/case-access';
import { CasesService } from '../cases/cases.service';
import { sendDeliveredEmail, sendDispatchedEmail } from '../../lib/order-emails';

export interface DispatchDto {
    courier: string;
    trackingNumber?: string;
}

const DISPATCHABLE_STATUSES = ['DELIVERY_PAID'];
const DELIVERABLE_STATUSES = ['DELIVERY_PAID', 'DISPATCHED'];

async function loadPaidCase(caseId: string) {
    const caseRecord = await prisma.case.findUnique({ where: { id: caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };

    const order = await prisma.order.findFirst({ where: { caseId } });
    if (!order) {
        throw { status: 409, message: 'There is no order yet because the delivery payment has not been received.' };
    }
    return { caseRecord, order };
}

export const FulfilmentService = {
    async dispatch(caseId: string, dto: DispatchDto, admin: AuthedUser) {
        const courier = typeof dto.courier === 'string' ? dto.courier.trim() : '';
        const trackingNumber = typeof dto.trackingNumber === 'string' ? dto.trackingNumber.trim() : '';
        if (!courier) throw { status: 400, message: 'Courier is required' };
        if (courier.length > 100 || trackingNumber.length > 100) {
            throw { status: 400, message: 'Courier and tracking number must be 100 characters or fewer' };
        }

        const { caseRecord, order } = await loadPaidCase(caseId);
        if (!DISPATCHABLE_STATUSES.includes(caseRecord.status)) {
            throw { status: 409, message: `This case is "${caseRecord.status}" and cannot be dispatched.` };
        }

        await prisma.$transaction([
            prisma.order.update({
                where: { id: order.id },
                data: { status: 'In Transit', carrier: courier, trackingNumber: trackingNumber || null },
            }),
            prisma.case.update({
                where: { id: caseId },
                data: {
                    status: 'DISPATCHED',
                    courier,
                    trackingNumber: trackingNumber || null,
                    timelineEntries: {
                        create: [
                            {
                                title: 'Product dispatched',
                                completed: true,
                                details: trackingNumber ? `${courier} · ${trackingNumber}` : courier,
                            },
                        ],
                    },
                },
            }),
        ]);

        void sendDispatchedEmail({
            email: caseRecord.customerEmail,
            fullName: caseRecord.customerName,
            productName: caseRecord.productName,
            referenceNumber: caseRecord.referenceNumber,
            courier,
            trackingNumber: trackingNumber || null,
        });

        return CasesService.getOne(caseId, admin);
    },

    async deliver(caseId: string, admin: AuthedUser) {
        const { caseRecord, order } = await loadPaidCase(caseId);
        if (!DELIVERABLE_STATUSES.includes(caseRecord.status)) {
            throw { status: 409, message: `This case is "${caseRecord.status}" and cannot be marked as delivered.` };
        }

        const monitoringDays = caseRecord.monitoringDaysTotal || 7;

        await prisma.$transaction([
            prisma.order.update({
                where: { id: order.id },
                data: { status: 'Delivered', deliveryDate: new Date() },
            }),
            prisma.case.update({
                where: { id: caseId },
                data: {
                    status: 'MONITORING',
                    monitoringDay: 1,
                    monitoringDaysTotal: monitoringDays,
                    timelineEntries: {
                        create: [
                            { title: 'Product delivered', completed: true },
                            {
                                title: 'Monitoring started',
                                completed: true,
                                details: `Your ${monitoringDays}-day monitoring period has begun.`,
                            },
                        ],
                    },
                },
            }),
        ]);

        void sendDeliveredEmail({
            email: caseRecord.customerEmail,
            fullName: caseRecord.customerName,
            productName: caseRecord.productName,
            referenceNumber: caseRecord.referenceNumber,
            monitoringDays,
        });

        return CasesService.getOne(caseId, admin);
    },
};