'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart, Product } from '@/hooks/useCart';
import styles from './ProductsSection.module.css';

interface ProductsSectionProps {
  products?: Product[];
}

export function ProductsSection({ products = [] }: ProductsSectionProps) {
  const { addToCart } = useCart();

  // If no products passed (e.g. loading or error), we might want to show skeletons or empty state.
  // But for now, if empty, we just don't render or render empty.
  // The parent component should handle fetching.

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <div className={styles.pawBackground}>
              <Image
                src="/assets/images/Produtos/img.svg"
                alt="Background Patinha"
                width={100}
                height={100}
              />
            </div>
            <h2 className={styles.title}>Produtos</h2>
          </div>
          
          <Link href="/produtos" className={styles.viewAllBtn}>
            Ver todos os produtos
          </Link>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageContainer}>
                {/* Sale tag removed or added back based on data */}
                {product.isSale && <span className={styles.saleTag}>Oferta</span>}
                <Image
                  src={product.image || '/assets/images/Produtos/img.svg'} // Fallback
                  alt={product.name}
                  width={200}
                  height={200}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.priceContainer}>
                  {product.oldPrice && (
                    <span className={styles.oldPrice}>R${product.oldPrice.toFixed(2)}</span>
                  )}
                  <span className={styles.price}>R${product.price.toFixed(2)}</span>
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <button 
                  className={styles.addButton} 
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart size={18} />
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
