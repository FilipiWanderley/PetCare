import Image from 'next/image';
import styles from './ServicesSection.module.css';

const SERVICES = [
  {
    title: 'Banho & Tosa',
    description: 'Transforme o dia do seu pet com um spa day completo. Utilizamos produtos hipoalergênicos e técnicas que garantem beleza, conforto e muito bem-estar.',
    image: '/services/bath.jpg',
  },
  {
    title: 'Veterinário',
    description: 'Saúde em primeiro lugar. Nossa equipe de especialistas está pronta para cuidar do seu pet com diagnósticos precisos e atendimento humanizado.',
    image: '/services/vet.jpg',
  },
  {
    title: 'Vacinação',
    description: 'Proteção garantida. Mantenha a carteirinha em dia com as melhores vacinas do mercado, aplicadas com todo o cuidado e segurança que ele merece.',
    image: '/services/vaccine.jpg',
  },
  {
    title: 'Estética',
    description: 'Realce a beleza natural. Hidratação profunda, cortes de raça e tratamentos exclusivos para deixar seu pet ainda mais deslumbrante.',
    image: '/services/grooming.jpg',
  },
];

export function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cuidado Premium para seu Melhor Amigo</h2>
          <p className={styles.subtitle}>
            Mais do que um pet shop, somos um centro de bem-estar. Do banho relaxante aos cuidados médicos essenciais, proporcionamos uma experiência de amor e excelência.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <div key={service.title} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
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
