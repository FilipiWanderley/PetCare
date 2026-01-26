import Image from 'next/image';
import { ArrowRight, PawPrint } from 'lucide-react';
import styles from './LoyaltySection.module.css';

export function LoyaltySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.tag}>Clube de Vantagens</span>
            <h2 className={styles.title}>
              Leve a felicidade do seu pet <span className={styles.highlight}>às alturas!</span>
            </h2>
            <p className={styles.description}>
              Faça parte do nosso clube exclusivo. Acumule pontos em banhos, tosas e consultas e troque por descontos e mimos especiais. Porque seu melhor amigo merece ser VIP.
            </p>
            
            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <PawPrint className={styles.pawIcon} size={24} /> Descontos exclusivos em produtos
              </li>
              <li className={styles.benefitItem}>
                <PawPrint className={styles.pawIcon} size={24} /> Prioridade no agendamento
              </li>
              <li className={styles.benefitItem}>
                <PawPrint className={styles.pawIcon} size={24} /> Brindes surpresa no aniversário do pet
              </li>
            </ul>

            <button className={styles.ctaButton}>
              Quero Participar Gratuitamente <ArrowRight size={20} />
            </button>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/assets/images/animais.svg"
              alt="Cão e Gato voando com balões"
              width={500}
              height={500}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
