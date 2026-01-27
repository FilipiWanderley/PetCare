'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import styles from './page.module.css';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, deleteFromCart, totalValue, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <ShoppingCart size={64} className={styles.icon} />
          <h1 className={styles.title}>Seu carrinho está vazio</h1>
          <p className={styles.description}>
            Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          </p>
          <Link href="/produtos" className={styles.button}>
            Ver Produtos
          </Link>
        </div>
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
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={styles.itemImage}
                />
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

          <button className={styles.checkoutBtn}>
            Finalizar Compra
          </button>
          
          <Link href="/produtos" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#6B7280', textDecoration: 'none' }}>
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
