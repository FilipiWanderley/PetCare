'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';
import styles from './page.module.css';
import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart on successful payment
    // Note: Ideally, we should verify the payment status from URL params (payment_intent_client_secret)
    // before clearing, but for this simplified flow, we assume success if we reached this page.
    clearCart();
  }, [clearCart]);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <CheckCircle size={64} color="var(--success)" />
        </div>
        <h1 className={styles.title}>Pagamento Confirmado!</h1>
        <p className={styles.message}>
          Seu pedido foi processado com sucesso. Você receberá um e-mail com os detalhes em breve.
        </p>
        <div className={styles.actions}>
          <Link href="/produtos">
            <Button variant="primary">Continuar Comprando</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Ver Meus Pedidos</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
