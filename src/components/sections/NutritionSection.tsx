import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import styles from './NutritionSection.module.css';

const PRODUCTS = [
  {
    id: 1,
    name: 'Drools',
    weight: '3KG',
    description: 'Ração seca para cães adultos, sabor frango e ovo, 3 kg.',
    image: '/assets/images/Ali1.svg',
    blobColor: 'yellow',
    blobRotation: '0deg', // Point Bottom-Left
  },
  {
    id: 2,
    name: 'Canine Creek',
    weight: '4 KG',
    description: 'Ração seca para cães adultos, sabor frango e ovo, 3 kg.',
    image: '/assets/images/Ali2.svg',
    blobColor: 'gray',
    blobRotation: '45deg', // Point Bottom
  },
  {
    id: 3,
    name: 'Biscrok Biscuits',
    weight: '', // No weight in title for this one in reference? Reference says "Biscrok Biscuits"
    description: 'Ração seca para cães adultos, sabor frango e ovo, 3 kg.',
    image: '/assets/images/Ali3.svg',
    blobColor: 'yellow',
    blobRotation: '90deg', // Point Bottom-Right
  },
];

export function NutritionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>Nutrientes e Alimentos para Cães e Gatos</h3>
              <div className={styles.titleUnderline}></div>
            </div>
            <h2 className={styles.subtitle}>25 % OFF em todos os produtos</h2>
          </div>
          
          <button className={styles.viewMoreBtn}>
            Ver Mais <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.grid}>
          {PRODUCTS.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className={styles.productImage}
                />
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.productName}>
                  {product.name} {product.weight && <span>| {product.weight}</span>}
                </h3>
                <p className={styles.productDesc}>{product.description}</p>
                <button className={styles.buyBtn}>
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
