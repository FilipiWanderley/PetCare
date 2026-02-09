'use client';

import Image from 'next/image';
import { ShoppingCart, Check, PackageSearch } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/hooks/useCart';
import styles from './page.module.css';
import { useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';

interface ProductsGridProps {
  products: Product[];
}
// ... existing GridItem code ...
function GridItem({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(product.image);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.productImage}>
        {imgSrc && !imgSrc.includes('ShoppingBag') ? (
          <Image
            src={imgSrc}
            alt={product.name}
            width={200}
            height={200}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            onError={() => setImgSrc(undefined)}
          />
        ) : (
          <ShoppingCart size={48} />
        )}
      </div>

      <span className={styles.productPrice}>
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
          product.price
        )}
      </span>

      <h3 className={styles.productName}>{product.name}</h3>

      <button
        className={styles.button}
        onClick={handleAdd}
        aria-label={
          isAdded ? `Produto ${product.name} adicionado` : `Adicionar ${product.name} ao carrinho`
        }
        disabled={isAdded}
        style={
          isAdded
            ? { backgroundColor: 'var(--success)', color: 'white', borderColor: 'var(--success)' }
            : {}
        }
      >
        {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
        {isAdded ? 'Adicionado!' : 'Adicionar ao Carrinho'}
      </button>
    </div>
  );
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="Nenhum produto encontrado"
        description="Parece que nosso estoque foi levado por um bando de cachorrinhos felizes. Volte mais tarde!"
        icon={PackageSearch}
      />
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <GridItem key={product.id} product={product} />
      ))}
    </div>
  );
}
