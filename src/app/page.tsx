import Image from 'next/image';
import styles from './page.module.css';
import { AppointmentForm } from '@/components/features/AppointmentForm';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialCard } from '@/components/features/TestimonialCard';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.highlight}>Cuide do seu pet</span> com agendamento simples e profissional
            </h1>
            <p className={styles.heroSubtitle}>
              Agende banho, tosa, consulta e mais serviços para seu pet em poucos cliques. Sem complicação, sem WhatsApp bagunçado.
            </p>
            <a href="#agendar" className={styles.ctaButton}>
              Acessar
            </a>
          </div>
          
          <div className={styles.heroImageWrapper}>
            <div className={styles.blobYellowLarge}></div>
            <div className={styles.blobYellowSmall}></div>
            <div className={styles.sparkle}></div>
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

      {/* Testimonial Section - Moved between Hero and Booking */}
      <section className={styles.testimonialSection}>
        <div className={styles.testimonialContainer}>
          <TestimonialCard />
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
    </main>
  );
}
