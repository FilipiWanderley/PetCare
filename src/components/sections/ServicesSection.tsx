import Image from 'next/image';
import styles from './ServicesSection.module.css';

const SERVICES = [
  {
    title: 'Adestramento',
    description: 'Técnicas modernas para melhorar o comportamento e a obediência do seu pet.',
    image: '/assets/icons/SVG/Adestra.svg',
  },
  {
    title: 'Alimentação',
    description: 'Opções nutritivas e balanceadas para a saúde e vitalidade do seu companheiro.',
    image: '/assets/icons/SVG/Alimen.svg',
  },
  {
    title: 'Saúde',
    description: 'Cuidados veterinários completos para garantir o bem-estar do seu animal.',
    image: '/assets/icons/SVG/Saúde.svg',
  },
  {
    title: 'Adoção',
    description: 'Encontre seu novo melhor amigo e dê um lar cheio de amor para quem precisa.',
    image: '/assets/icons/SVG/adoçao.svg',
  },
  {
    title: 'Cuidados',
    description: 'Banho, tosa e higiene completa com profissionais carinhosos e experientes.',
    image: '/assets/icons/SVG/cuidados.svg',
  },
  {
    title: 'Curiosidades',
    description: 'Dicas incríveis e informações úteis para você entender melhor o mundo pet.',
    image: '/assets/icons/SVG/curiosidades.svg',
  },
];

export function ServicesSection() {
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
          {SERVICES.map((service) => (
            <div key={service.title} className={styles.card}>
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
