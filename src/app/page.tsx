import styles from './page.module.css';
import { HeroCarousel } from '@/components/features/HeroCarousel';
import { AppointmentForm } from '@/components/features/AppointmentForm';
import { CTA } from '@/components/sections/CTA';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialCard } from '@/components/features/TestimonialCard';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.bgWrapper}>
        <HeroCarousel />
      </div>

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Cuide do seu pet com agendamento simples e profissional
          </h1>
          <p className={styles.subtitle}>
            Agende banho, tosa, consulta e mais serviços para seu pet em poucos cliques. Sem complicação, sem WhatsApp bagunçado.
          </p>
          
          <div className={styles.features}>
             <div className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span> Agendamento instantâneo
             </div>
             <div className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span> Organização automática
             </div>
             <div className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span> Lembretes por telefone
             </div>
             <div className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span> Histórico completo
             </div>
          </div>
        </div>
      </section>

      <section className={styles.bookingSection} id="agendar">
        <div className={styles.bookingContainer}>
          <h2 className={styles.sectionTitle}>Agende seu horário</h2>
          <AppointmentForm />
        </div>
      </section>
      
      <ServicesSection />
      
      <TestimonialCard />

      <CTA />
    </main>
  );
}
