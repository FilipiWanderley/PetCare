'use client';

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/hooks/useCart'; // Or import from Prisma types if compatible, but useCart defines its own interface.
import styles from './page.module.css';

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const { addToCart } = useCart();

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.productImage}>
             {product.image && !product.image.includes('ShoppingBag') ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
             ) : (
                <ShoppingBag size={48} />
             )}
          </div>
          <h3 className={styles.productName}>{product.name}</h3>
          <span className={styles.productPrice}>R$ {product.price.toFixed(2)}</span>
          <button 
            className={styles.button}
            onClick={() => addToCart(product)}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
}
