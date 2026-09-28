import prisma from '../../lib/prisma';
import { StripeProvider } from './stripe.provider';

export interface CreatePaymentIntentDto {
  caseId: string;
  amount: number;
  currency?: string;
}

export interface ConfirmPaymentDto {
  paymentIntentId: string;
}

// Note: there is no dedicated Payment model in the schema yet. Payment state
// is tracked via Case.status and Order.status. If you want a full payment
// history/ledger, add a `Payment` model to schema.prisma and wire it in here.

export const PaymentsService = {
  async createIntent(data: CreatePaymentIntentDto) {
    const caseRecord = await prisma.case.findUnique({ where: { id: data.caseId } });
    if (!caseRecord) throw { status: 404, message: 'Case not found' };

    const intent = await StripeProvider.createPaymentIntent(data.amount, data.currency ?? 'gbp', {
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

  async confirm(data: ConfirmPaymentDto) {
    const intent = await StripeProvider.retrievePaymentIntent(data.paymentIntentId);

    if (intent.status !== 'succeeded') {
      throw { status: 400, message: `Payment not completed (status: ${intent.status})` };
    }

    const caseId = intent.metadata?.caseId;
    if (!caseId) throw { status: 400, message: 'Payment intent missing case reference' };

    return prisma.case.update({
      where: { id: caseId },
      data: {
        status: 'DELIVERY_PAID',
        timelineEntries: {
          create: [{ title: 'Delivery payment received', completed: true }],
        },
      },
      include: { timelineEntries: true },
    });
  },

  async handleWebhookEvent(rawBody: Buffer, signature: string) {
    const event = await StripeProvider.constructWebhookEvent(rawBody, signature);

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as any;
      const caseId = intent.metadata?.caseId;
      if (caseId) {
        await prisma.case.update({
          where: { id: caseId },
          data: { status: 'DELIVERY_PAID' },
        });
      }
    }

    return { received: true };
  },
};
