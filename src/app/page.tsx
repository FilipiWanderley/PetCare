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
          <div className={styles.bookingContent}>
            <div className={styles.formWrapper}>
              <AppointmentForm />
            </div>
            <div className={styles.bookingText}>
              <h3>Seu pet merece o melhor cuidado</h3>
              <p>
                Sabemos que a rotina é corrida, mas a saúde e o bem-estar do seu amigo não podem esperar. 
                Por isso, criamos um sistema de agendamento pensado em você: rápido, prático e sem burocracia.
              </p>
              <ul className={styles.benefitsList}>
                <li>
                  <span className={styles.benefitIcon}>✨</span>
                  <span>Profissionais apaixonados por animais</span>
                </li>
                <li>
                  <span className={styles.benefitIcon}>🏥</span>
                  <span>Ambiente seguro e higienizado</span>
                </li>
                <li>
                  <span className={styles.benefitIcon}>⏰</span>
                  <span>Pontualidade e respeito ao seu tempo</span>
                </li>
                <li>
                  <span className={styles.benefitIcon}>💖</span>
                  <span>Tratamento personalizado para cada pet</span>
                </li>
              </ul>
              <div className={styles.promoBox}>
                <strong>Primeira vez aqui?</strong>
                <span>Ganhe um mimo especial no primeiro banho!</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServicesSection />
      
      <TestimonialCard />

      <CTA />
    </main>
  );
}
