'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart, Product } from '@/hooks/useCart';
import styles from './ProductsSection.module.css';
import { useState } from 'react';

interface ProductsSectionProps {
  products?: Product[];
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image || '/assets/images/Produtos/Background1.svg');

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.isSale && <span className={styles.saleTag}>Oferta</span>}
        <Image
          src={imgSrc}
          alt={product.name}
          width={200}
          height={200}
          className={styles.productImage}
          onError={() => setImgSrc('/assets/images/Produtos/Background1.svg')}
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
          aria-label={
            isAdded ? `Produto ${product.name} adicionado` : `Adicionar ${product.name} ao carrinho`
          }
          onClick={handleAdd}
          disabled={isAdded}
          style={
            isAdded
              ? { backgroundColor: 'var(--success)', color: 'white', borderColor: 'var(--success)' }
              : {}
          }
        >
          {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
          {isAdded ? 'Adicionado!' : 'Adicionar'}
        </button>
      </div>
    </div>
  );
}

export function ProductsSection({ products = [] }: ProductsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Produtos</h2>
          </div>

          <Link href="/produtos" className={styles.viewAllBtn}>
            Ver todos os produtos
          </Link>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
