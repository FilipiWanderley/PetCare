'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart, Product } from '@/hooks/useCart';
import styles from './ProductsSection.module.css';

const products: Product[] = [
  {
    id: 1,
    name: 'Brit Premium Pet Food',
    price: 120.00,
    image: '/assets/images/Produtos/Background1.svg'
  },
  {
    id: 2,
    name: 'Petiscos para gatos exigentes',
    price: 12.00,
    image: '/assets/images/Produtos/Background2.svg'
  },
  {
    id: 3,
    name: 'Nutrição exclusiva para animais de estimação',
    price: 88.00,
    image: '/assets/images/Produtos/Background3.svg'
  },
  {
    id: 4,
    name: 'Miau Mordidas',
    price: 8.00,
    image: '/assets/images/Produtos/Background4.svg'
  },
  {
    id: 5,
    name: 'Ração para gatos Ocean Treats',
    price: 250.00,
    image: '/assets/images/Produtos/Background5.svg'
  },
  {
    id: 6,
    name: 'Brinquedos',
    price: 36.00,
    image: '/assets/images/Produtos/Background6.svg'
  },
  {
    id: 7,
    name: 'Petiscos para Patinhas Exigentes',
    price: 120.00,
    image: '/assets/images/Produtos/Background7.svg'
  },
  {
    id: 8,
    name: 'Ração supernutritiva para cães',
    price: 17.00,
    oldPrice: 28.00,
    isSale: true,
    image: '/assets/images/Produtos/Background8.svg'
  }
];

export function ProductsSection() {
  const { addToCart } = useCart();

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
                {/* Sale tag removed */}
                <Image
                  src={product.image}
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
