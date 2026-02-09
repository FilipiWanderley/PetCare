import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { PaymentService } from '@/services/payment.service';
import { withApiErrorHandling } from '@/lib/api-utils';
import { logger } from '@/lib/logger';

export const POST = withApiErrorHandling(async (req: Request) => {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    logger.error('STRIPE_WEBHOOK_SECRET is missing');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event;

  try {
    event = PaymentService.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    // Explicitly return 400 so Stripe doesn't retry signature errors
    logger.warn('Webhook signature verification failed', { error: String(err) });
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await PaymentService.handlePaymentSuccess(paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const paymentFailed = event.data.object;
        await PaymentService.handlePaymentFailure(paymentFailed.id);
        break;

      default:
        // logger.debug(`Unhandled event type ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    // Log is handled by PaymentService, but we need to ensure we return 500 for retry
    // withApiErrorHandling would catch this if we threw, but since we are inside a try/catch here:
    throw err; // Re-throw to let withApiErrorHandling handle the 500 response and logging
  }
});
