'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import styles from './page.module.css';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, deleteFromCart, totalValue, totalItems, isInitialized } =
    useCart();

  if (!isInitialized) {
    return (
      <div className={styles.container}>
        <div className={styles.cartWrapper}>
          <div className={styles.cartList}>
            {[1, 2].map((i) => (
              <div
                key={i}
                className={styles.cartItem}
                style={{ border: '1px solid var(--border-color)' }}
              >
                <div className={styles.itemImageContainer}>
                  <Skeleton width="100%" height="100%" borderRadius={8} />
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <Skeleton width={150} height={24} borderRadius={4} />
                    <Skeleton width={80} height={24} borderRadius={4} />
                  </div>
                  <div className={styles.itemActions}>
                    <Skeleton width={100} height={32} borderRadius={4} />
                    <Skeleton width={80} height={32} borderRadius={4} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <div style={{ marginBottom: '1rem' }}>
              <Skeleton width={150} height={28} borderRadius={4} />
            </div>
            <div className={styles.summaryRow}>
              <Skeleton width={100} height={20} borderRadius={4} />
              <Skeleton width={80} height={20} borderRadius={4} />
            </div>
            <div className={styles.summaryRow}>
              <Skeleton width={100} height={20} borderRadius={4} />
              <Skeleton width={80} height={20} borderRadius={4} />
            </div>
            <div className={styles.totalRow}>
              <Skeleton width={100} height={24} borderRadius={4} />
              <Skeleton width={100} height={24} borderRadius={4} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          title="Seu carrinho está vazio"
          description="Que tal explorar nossos produtos e encontrar algo especial para o seu pet?"
          icon={ShoppingCart}
          actionLabel="Explorar Produtos"
          actionLink="/produtos"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartWrapper}>
        <div className={styles.cartList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImageContainer}>
                <Image src={item.image} alt={item.name} fill className={styles.itemImage} />
              </div>

              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <span className={styles.itemPrice}>
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Diminuir quantidade"
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => addToCart(item)}
                      aria-label="Aumentar quantidade"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => deleteFromCart(item.id)}
                    aria-label="Remover produto do carrinho"
                  >
                    <Trash2 size={16} />
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal ({totalItems} itens)</span>
            <span>R$ {totalValue.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Frete</span>
            <span>Grátis</span>
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span>R$ {totalValue.toFixed(2)}</span>
          </div>

          <Link href="/checkout" style={{ display: 'block', marginTop: '1.5rem' }}>
            <Button fullWidth size="lg">
              Finalizar Compra
              <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </Button>
          </Link>

          <Link
            href="/produtos"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: '1rem',
              color: '#6B7280',
              textDecoration: 'none',
            }}
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
