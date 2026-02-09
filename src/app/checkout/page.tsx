'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '@/hooks/useCart';
import { createPaymentIntentAction } from '@/actions/checkout-actions';
import { CheckoutForm } from '@/components/features/checkout/CheckoutForm';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { cart, totalValue } = useCart();
  const [clientSecret, setClientSecret] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/carrinho');
      return;
    }

    // Create PaymentIntent as soon as the page loads
    createPaymentIntentAction({
      items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
      // Pass guest info if you had a previous step to collect it
    })
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('No client secret returned');
        }
      })
      .catch((err) => console.error('Error creating payment intent:', err));
  }, [cart, router]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#F59E0B',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (cart.length === 0) {
    return null; // or loading spinner, will redirect
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.grid}>
          <div className={styles.summary}>
            <h2>Resumo do Pedido</h2>
            <ul className={styles.items}>
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <span>Total</span>
              <span>R$ {totalValue.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.payment}>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm amount={totalValue} />
              </Elements>
            )}
            {!clientSecret && <div className={styles.loading}>Carregando pagamento...</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
