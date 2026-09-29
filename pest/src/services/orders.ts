import api from './api';
import { OrderItemRecord } from '../types';
import { formatDate } from './format';

interface RawOrder {
    id: string;
    orderNumber: string;
    productName: string;
    productPrice: number;
    deliveryFee: number;
    total: number;
    status: OrderItemRecord['status'];
    carrier?: string | null;
    trackingNumber?: string | null;
    placedDate: string;
    deliveryDate?: string | null;
    propertyAddress: string;
    case?: { referenceNumber: string } | null;
}

function adaptOrder(raw: RawOrder): OrderItemRecord {
    return {
        id: raw.id,
        orderNumber: raw.orderNumber,
        productName: raw.productName,
        caseRef: raw.case?.referenceNumber ?? '',
        productPrice: raw.productPrice,
        deliveryFee: raw.deliveryFee,
        total: raw.total,
        status: raw.status,
        carrier: raw.carrier ?? '',
        trackingNumber: raw.trackingNumber ?? '',
        placedDate: formatDate(raw.placedDate) ?? raw.placedDate,
        deliveryDate: formatDate(raw.deliveryDate),
        propertyAddress: raw.propertyAddress,
    };
}

export const OrdersService = {
    async list(): Promise<OrderItemRecord[]> {
        const { data } = await api.get<RawOrder[]>('/orders');
        return data.map(adaptOrder);
    },
};

export default OrdersService;