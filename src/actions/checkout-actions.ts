'use server';

import { PaymentService } from '@/services/payment.service';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';

interface CheckoutItem {
  id: number;
  quantity: number;
}

interface CheckoutData {
  items: CheckoutItem[];
  customerEmail?: string;
  customerName?: string;
}

export async function createPaymentIntentAction(data: CheckoutData) {
  try {
    const user = await getCurrentUser();

    // 1. Fetch products to validate prices
    const productIds = data.items.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    // 2. Calculate total and prepare order items
    let total = 0;
    const orderItemsData = [];

    for (const item of data.items) {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product with ID ${item.id} not found`);
      }

      // Check stock (optional, but good practice)
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      // Use sale price if available
      const price = product.isSale && product.oldPrice ? product.price : product.price; // Logic might be: isSale means price is the sale price.
      // Looking at schema: price Float, oldPrice Float?. isSale Boolean.
      // Usually 'price' is the current selling price. 'oldPrice' is the original.

      total += price * item.quantity;
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: price,
      });
    }

    // 3. Create Order in DB
    const order = await prisma.order.create({
      data: {
        total,
        status: 'pending',
        userId: user?.id,
        customerEmail: user?.email || data.customerEmail,
        customerName: user?.name || data.customerName,
        items: {
          create: orderItemsData,
        },
      },
    });

    // 4. Create Stripe Payment Intent
    const paymentIntent = await PaymentService.createPaymentIntent(order.id, total);

    // 5. Update Order with PaymentIntentId
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    };
  } catch (error) {
    console.error('Checkout Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create payment intent');
  }
}
