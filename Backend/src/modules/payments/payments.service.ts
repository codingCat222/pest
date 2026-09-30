import prisma from '../../lib/prisma';
import { StripeProvider } from './stripe.provider';
import { AuthedUser, assertCaseAccess } from '../../common/case-access';

export interface CreatePaymentIntentDto {
  caseId: string;
  currency?: string;
}

export interface ConfirmPaymentDto {
  paymentIntentId: string;
}

// Note: there is no dedicated Payment model in the schema yet. Payment state
// is tracked via Case.status and Order.status. If you want a full payment
// history/ledger, add a `Payment` model to schema.prisma and wire it in here.

const UNPAID_STATUSES = ['NEW', 'ELIGIBILITY_CHECK', 'PRODUCT_CLAIMED', 'AWAITING_DELIVERY_PAYMENT'];

async function settleDeliveryPayment(caseId: string) {
  const caseRecord = await prisma.case.findUnique({ where: { id: caseId } });
  if (!caseRecord) throw { status: 404, message: 'Case not found' };

  const existingOrder = await prisma.order.findFirst({ where: { caseId } });
  if (!existingOrder) {
    await prisma.order.create({
      data: {
        orderNumber: `ORD-${caseRecord.referenceNumber.replace(/\D/g, '')}`,
        caseId,
        productName: caseRecord.productName,
        productPrice: 0,
        deliveryFee: caseRecord.deliveryFee,
        total: caseRecord.deliveryFee,
        status: 'Preparing',
        carrier: caseRecord.courier ?? undefined,
        propertyAddress: [caseRecord.propertyAddress, caseRecord.postcode].filter(Boolean).join(', '),
      },
    });
  }

  if (UNPAID_STATUSES.includes(caseRecord.status)) {
    await prisma.case.update({
      where: { id: caseId },
      data: {
        status: 'DELIVERY_PAID',
        timelineEntries: {
          create: [{ title: 'Delivery payment received', completed: true }],
        },
      },
    });
  }

  return prisma.case.findUnique({
    where: { id: caseId },
    include: { timelineEntries: { orderBy: { date: 'asc' } } },
  });
}

export const PaymentsService = {
  async createIntent(data: CreatePaymentIntentDto, user: AuthedUser) {
    const caseRecord = await assertCaseAccess(data.caseId, user);
    if (!(caseRecord.deliveryFee > 0)) {
      throw { status: 400, message: 'This case has no delivery fee to pay' };
    }
    if (!UNPAID_STATUSES.includes(caseRecord.status)) {
      throw { status: 409, message: 'Delivery for this case has already been paid' };
    }

    const intent = await StripeProvider.createPaymentIntent(caseRecord.deliveryFee, data.currency ?? 'gbp', {
      caseId: data.caseId,
    });

    await prisma.case.update({
      where: { id: data.caseId },
      data: { status: 'AWAITING_DELIVERY_PAYMENT' },
    });

    return {
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
    };
  },

  async confirm(data: ConfirmPaymentDto, user: AuthedUser) {
    const intent = await StripeProvider.retrievePaymentIntent(data.paymentIntentId);

    if (intent.status !== 'succeeded') {
      throw { status: 400, message: `Payment not completed (status: ${intent.status})` };
    }

    const caseId = intent.metadata?.caseId;
    if (!caseId) throw { status: 400, message: 'Payment intent missing case reference' };

    const caseRecord = await assertCaseAccess(caseId, user);
    if (intent.amount !== Math.round(caseRecord.deliveryFee * 100)) {
      throw { status: 400, message: 'Payment amount does not match the delivery fee' };
    }

    return settleDeliveryPayment(caseId);
  },

  async handleWebhookEvent(rawBody: Buffer, signature: string) {
    const event = await StripeProvider.constructWebhookEvent(rawBody, signature);

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as any;
      const caseId = intent.metadata?.caseId;
      if (caseId) {
        const caseRecord = await prisma.case.findUnique({ where: { id: caseId } });
        if (caseRecord && intent.amount === Math.round(caseRecord.deliveryFee * 100)) {
          await settleDeliveryPayment(caseId);
        }
      }
    }

    return { received: true };
  },
};