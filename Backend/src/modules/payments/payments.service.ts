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



export const PaymentsService = {
  async createIntent(data: CreatePaymentIntentDto, user: AuthedUser) {
    const caseRecord = await assertCaseAccess(data.caseId, user);
    if (!(caseRecord.deliveryFee > 0)) {
      throw { status: 400, message: 'This case has no delivery fee to pay' };
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