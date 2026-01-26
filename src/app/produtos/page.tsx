'use client';

import styles from './page.module.css';
import { ShoppingBag } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Ração Premium Cães', price: 'R$ 149,90' },
  { id: 2, name: 'Brinquedo Mordedor', price: 'R$ 29,90' },
  { id: 3, name: 'Shampoo Hipoalergênico', price: 'R$ 45,50' },
  { id: 4, name: 'Coleira Ajustável', price: 'R$ 35,00' },
  { id: 5, name: 'Cama Confortável G', price: 'R$ 189,90' },
  { id: 6, name: 'Petiscos Naturais', price: 'R$ 15,90' },
];

export default function ProductsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Nossos Produtos</h1>
      
      <div className={styles.grid}>
        {PRODUCTS.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.productImage}>
              <ShoppingBag size={48} />
            </div>
            <h3 className={styles.productName}>{product.name}</h3>
            <span className={styles.productPrice}>{product.price}</span>
            <button className={styles.button}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </main>
  );
}
