import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import styles from './NutritionSection.module.css';

interface NutritionProduct {
  id: number;
  name: string;
  description: string | null;
  image: string;
  metadata: any; // Using any for simplicity with Json type, ideally strictly typed
}

interface NutritionSectionProps {
  products?: NutritionProduct[];
}

export function NutritionSection({ products = [] }: NutritionSectionProps) {
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
          {products.map((product) => {
             const meta = product.metadata || {};
             const weight = meta.weight;
             // blobColor and blobRotation are used in styles? 
             // The original code used them in the map loop but didn't apply them to styles explicitly in the provided snippet?
             // Ah, wait, checking the original snippet...
             // It didn't seem to use blobColor/Rotation in the JSX!
             // "blobColor: 'yellow', blobRotation: '0deg'" in PRODUCTS array.
             // But the JSX was:
             /*
              <div key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image ... />
                </div>
                ...
             */
             // It seems they were unused or I missed something in CSS module usage.
             // Let's assume they might be used later or I should ignore them if they weren't used.
             // But wait, the image background usually needs them.
             // If I look at the CSS file content provided earlier:
             // It doesn't show usage of dynamic colors.
             // So I will just render the data I have.

             return (
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
                  {product.name} {weight && <span>| {weight}</span>}
                </h3>
                <p className={styles.productDesc}>{product.description}</p>
                <button className={styles.buyBtn}>
                  Comprar
                </button>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
