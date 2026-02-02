import Image from 'next/image';
import styles from './PromoSection.module.css';

export function PromoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <h2 className={styles.title}>
              Excelência e dedicação no cuidado animal
            </h2>
            <p className={styles.description}>
              Serviços especializados de banho, tosa e veterinária com infraestrutura moderna. Agende agora e proporcione o melhor tratamento para o seu pet.
            </p>
            <a href="#agendar" className={styles.ctaButton}>
              Agende Aqui
            </a>
          </div>
          
          <div className={styles.imageWrapper}>
            <Image
              src="/assets/logo/ilustra.png"
              alt="Gato sendo servido"
              width={400}
              height={300}
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
