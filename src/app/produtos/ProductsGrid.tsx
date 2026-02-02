'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/hooks/useCart';
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
                <ShoppingCart size={48} />
             )}
          </div>
          
          <span className={styles.productPrice}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </span>

          <h3 className={styles.productName}>{product.name}</h3>
          
          <button 
            className={styles.button}
            onClick={() => addToCart(product)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart size={20} />
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
}
