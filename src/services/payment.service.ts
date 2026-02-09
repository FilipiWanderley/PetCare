import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';
import { AppError } from '@/lib/errors';
import Stripe from 'stripe';

export class PaymentService {
  /**
   * Creates a Stripe Payment Intent for an order.
   */
  static async createPaymentIntent(orderId: string, amount: number, currency: string = 'brl') {
    try {
      // Amount in cents
      const amountInCents = Math.round(amount * 100);
      logger.info('Creating PaymentIntent', { orderId, amountInCents });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        metadata: {
          orderId,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      logger.info('PaymentIntent created', { paymentIntentId: paymentIntent.id, orderId });
      return paymentIntent;
    } catch (error) {
      logger.error('Failed to create PaymentIntent', { orderId, error: String(error) });
      throw new AppError('PAYMENT_CREATE_FAILED', 'Erro ao iniciar pagamento');
    }
  }

  /**
   * Constructs a Stripe event from the signature and payload (for Webhooks).
   */
  static constructEvent(payload: string | Buffer, signature: string, secret: string): Stripe.Event {
    try {
      return stripe.webhooks.constructEvent(payload, signature, secret);
    } catch (error) {
      logger.warn('Webhook signature verification failed', { error: String(error) });
      throw error; // Caller (route handler) handles 400
    }
  }

  /**
   * Updates order status based on payment intent status.
   */
  static async handlePaymentSuccess(paymentIntentId: string) {
    try {
      logger.info('Handling payment success', { paymentIntentId });

      const order = await prisma.order.findUnique({
        where: { paymentIntentId },
      });

      if (!order) {
        logger.warn('Order not found by paymentIntentId, attempting metadata recovery', {
          paymentIntentId,
        });
        // Try to find by metadata
        const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
        const orderId = intent.metadata.orderId;

        if (orderId) {
          logger.info('Recovered orderId from metadata', { orderId });
          return await prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'paid',
              paymentIntentId: paymentIntentId, // Ensure it's linked
            },
          });
        }
        throw new Error(`Order not found for PaymentIntent: ${paymentIntentId}`);
      }

      return await prisma.order.update({
        where: { id: order.id },
        data: { status: 'paid' },
      });
    } catch (error) {
      logger.error('Failed to handle payment success', { paymentIntentId, error: String(error) });
      throw new AppError('PAYMENT_WEBHOOK_FAILED');
    }
  }

  static async handlePaymentFailure(paymentIntentId: string) {
    try {
      logger.info('Handling payment failure', { paymentIntentId });

      // Similar logic to success
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      const orderId = intent.metadata.orderId;

      if (orderId) {
        return await prisma.order.update({
          where: { id: orderId },
          data: { status: 'failed' },
        });
      } else {
        logger.warn('Could not find orderId in failed payment intent', { paymentIntentId });
      }
    } catch (error) {
      logger.error('Failed to handle payment failure', { paymentIntentId, error: String(error) });
      throw new AppError('PAYMENT_WEBHOOK_FAILED');
    }
  }
}
