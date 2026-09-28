import prisma from '../../lib/prisma';

export interface CreateOrderDto {
  caseId: string;
  productName: string;
  productPrice: number;
  deliveryFee: number;
  propertyAddress: string;
  carrier?: string;
}

export interface UpdateOrderStatusDto {
  status: 'Delivered' | 'In Transit' | 'Preparing' | 'Cancelled';
  trackingNumber?: string;
  carrier?: string;
  deliveryDate?: string;
}

function generateOrderNumber(): string {
  const num = Math.floor(10000 + Math.random() * 89999);
  return `ORD-${num}`;
}

export const OrdersService = {
  async list(requestingUser: { userId: string; role: string }) {
    const isStaff = requestingUser.role === 'ADMIN' || requestingUser.role === 'TECHNICIAN';
    return prisma.order.findMany({
      where: isStaff
        ? undefined
        : { case: { userId: requestingUser.userId } },
      include: { case: true },
      orderBy: { placedDate: 'desc' },
    });
  },

  async getOne(id: string, requestingUser: { userId: string; role: string }) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { case: true },
    });
    if (!order) throw { status: 404, message: 'Order not found' };

    const isStaff = requestingUser.role === 'ADMIN' || requestingUser.role === 'TECHNICIAN';
    if (!isStaff && order.case.userId !== requestingUser.userId) {
      throw { status: 403, message: 'Forbidden: not your order' };
    }

    return order;
  },

  async getForCase(caseId: string) {
    return prisma.order.findMany({ where: { caseId }, orderBy: { placedDate: 'desc' } });
  },

  async create(data: CreateOrderDto) {
    const caseRecord = await prisma.case.findUnique({ where: { id: data.caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };

    return prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        caseId: data.caseId,
        productName: data.productName,
        productPrice: data.productPrice,
        deliveryFee: data.deliveryFee,
        total: data.productPrice + data.deliveryFee,
        propertyAddress: data.propertyAddress,
        carrier: data.carrier,
        status: 'Preparing',
      },
    });
  },

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) throw { status: 404, message: 'Order not found' };

    return prisma.order.update({
      where: { id },
      data: {
        status: dto.status,
        trackingNumber: dto.trackingNumber,
        carrier: dto.carrier,
        deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : undefined,
      },
    });
  },
};
