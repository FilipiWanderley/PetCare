'use client';

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/Button';
import styles from './CheckoutForm.module.css';

interface CheckoutFormProps {
  amount: number;
}

export function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'Ocorreu um erro ao processar seu cartão.');
    } else {
      setMessage('Ocorreu um erro inesperado no pagamento. Por favor, tente novamente.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className={styles.form}>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />

      {message && <div className={styles.errorMessage}>{message}</div>}

      <div className={styles.actions}>
        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          fullWidth
          variant="primary"
          isLoading={isLoading}
        >
          {isLoading ? 'Processando Pagamento...' : `Pagar R$ ${amount.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
}
