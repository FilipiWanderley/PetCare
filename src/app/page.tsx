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

// Force dynamic rendering to ensure the page always fetches fresh data from the database
// This fixes the issue where the page was cached as static HTML when the database was empty
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Main Home Page Component
export default async function Home() {
  // Force re-render to pick up seeded data
  console.log('Rendering Home Page...');
  
  const [{ data: products }, { data: services }, { data: testimonials }] = await Promise.all([
    getProducts(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <main className={styles.main}>
      {/* DEBUG BANNER - TEMPORARY */}
      <div style={{ padding: '20px', background: '#ffebee', border: '2px solid red', margin: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#c62828' }}>🔧 Painel de Diagnóstico (Visível apenas para teste)</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px', color: '#333' }}>
          <li>📦 <strong>Produtos Encontrados:</strong> {products?.length || 0}</li>
          <li>🛠️ <strong>Serviços Encontrados:</strong> {services?.length || 0}</li>
          <li>💬 <strong>Depoimentos Encontrados:</strong> {testimonials?.length || 0}</li>
          <li>📅 <strong>Data/Hora do Server:</strong> {new Date().toLocaleString('pt-BR')}</li>
        </ul>
        <p style={{ fontSize: '0.9em', color: '#666' }}>Se os números forem 0, o banco de dados ainda não foi lido corretamente.</p>
      </div>

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
