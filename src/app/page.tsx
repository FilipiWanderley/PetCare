import Image from 'next/image';
import styles from './page.module.css';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PromoSection } from '@/components/sections/PromoSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { LoyaltySection } from '@/components/sections/LoyaltySection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { getProducts } from '@/actions/product-actions';
import { getServices } from '@/actions/service-actions';
import { getTestimonials } from '@/actions/testimonial-actions';

export default async function Home() {
  // Fetch data directly from the database
  const [{ data: products }, { data: services }, { data: testimonials }] = await Promise.all([
    getProducts(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Dê ao seu melhor amigo <span className={styles.highlight}>o cuidado que ele merece</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Soluções completas e profissionais para a saúde e bem-estar do seu animal. Agende banho, tosa e consultas veterinárias com rapidez e segurança.
            </p>
            <a href="#agendar" className={styles.ctaButton}>
              Agendar Agora
            </a>
          </div>
          
          <div className={styles.heroImageWrapper}>
            <div className={styles.blobYellowLarge}></div>
            <div className={styles.blobYellowSmall}></div>
            <div className={`${styles.sparkle} ${styles.sparkleBottom}`}></div>
            <div className={`${styles.sparkle} ${styles.sparkleEar}`}></div>
            <div className={`${styles.sparkle} ${styles.sparklePaw}`}></div>
            <div className={`${styles.sparkle} ${styles.sparkleRight}`}></div>
            <Image 
              src="/assets/images/ilustration.png" 
              alt="Cão e Gato felizes" 
              width={600} 
              height={500} 
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>
      
      <ServicesSection services={services || []} />
      <PromoSection />
      <ProductsSection products={products || []} />
      <LoyaltySection />
      <TestimonialsSection testimonials={testimonials || []} />
      <NewsletterSection />
    </main>
  );
}
