// Thin wrapper around Stripe so the rest of the app never imports the SDK directly.
// Requires the `stripe` package (`npm install stripe`) and STRIPE_SECRET_KEY in .env.
// If not configured, methods throw a clear error instead of crashing at import time.

let stripeClient: any = null;

function getClient() {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw { status: 500, message: 'Stripe is not configured (missing STRIPE_SECRET_KEY)' };
  }

  try {
    // Lazy require so the app can boot even if `stripe` isn't installed yet.
    const Stripe = require('stripe');
    stripeClient = new Stripe(secretKey);
    return stripeClient;
  } catch {
    throw { status: 500, message: "Stripe SDK not installed. Run 'npm install stripe'." };
  }
}

export const StripeProvider = {
  async createPaymentIntent(amount: number, currency: string = 'gbp', metadata?: Record<string, string>) {
    const stripe = getClient();
    return stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects the smallest currency unit
      currency,
      metadata,
    });
  },

  async retrievePaymentIntent(paymentIntentId: string) {
    const stripe = getClient();
    return stripe.paymentIntents.retrieve(paymentIntentId);
  },

  async constructWebhookEvent(rawBody: Buffer, signature: string) {
    const stripe = getClient();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw { status: 500, message: 'Stripe webhook secret not configured (missing STRIPE_WEBHOOK_SECRET)' };
    }
    return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  },
};
