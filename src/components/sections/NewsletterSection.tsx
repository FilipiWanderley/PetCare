import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import styles from './NewsletterSection.module.css';

export function NewsletterSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Não perca as nossas atualizações!</h2>
            <p className={styles.description}>
              Cadastre-se para receber novidades, novas ferramentas, descontos e atualizações sobre o mundo pet.
            </p>

            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <span className={styles.numberBadge}>01</span>
                <span className={styles.benefitText}>Receba atualizações em primeira mão</span>
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.numberBadge}>02</span>
                <span className={styles.benefitText}>Obtenha cupons de descontos</span>
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.numberBadge}>03</span>
                <span className={styles.benefitText}>Acesso a palestras e workshops exclusivos</span>
              </li>
            </ul>

            <div className={styles.inputWrapper}>
              <input 
                type="email" 
                placeholder="Insira o seu email..." 
                className={styles.emailInput}
              />
              <button className={styles.submitBtn} aria-label="Cadastrar">
                <ChevronRight size={24} color="#FFFFFF" />
              </button>
            </div>
          </div>

          <div className={styles.imageContent}>
            <Image
              src="/assets/images/Dog1.svg"
              alt="Cachorro feliz"
              width={400}
              height={500}
              className={styles.dogImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
