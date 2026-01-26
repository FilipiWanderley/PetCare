import Image from 'next/image';
import styles from './PromoSection.module.css';

export function PromoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <h2 className={styles.title}>
              Cuide de quem você ama com os melhores profissionais
            </h2>
            <p className={styles.description}>
              Oferecemos serviços completos de banho, tosa e veterinária com todo o carinho que seu pet merece. Agende agora e garanta o bem-estar do seu melhor amigo!
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
