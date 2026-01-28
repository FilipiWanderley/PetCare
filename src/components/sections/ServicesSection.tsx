import Image from 'next/image';
import styles from './ServicesSection.module.css';

interface Service {
  id?: string;
  title: string;
  description: string;
  image: string;
}

interface ServicesSectionProps {
  services?: Service[];
}

export function ServicesSection({ services = [] }: ServicesSectionProps) {
  // If no services provided (e.g. initial load or error), we might want fallbacks or just render nothing/empty grid.
  // The parent component handles fetching.

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tudo para o seu Pet</h2>
          <p className={styles.subtitle}>
            Explore nossos serviços e conteúdos pensados com carinho para o seu melhor amigo.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={service.id || index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={80}
                  height={80}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
