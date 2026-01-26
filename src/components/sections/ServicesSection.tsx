import Image from 'next/image';
import styles from './ServicesSection.module.css';

const SERVICES = [
  {
    title: 'Banho & Tosa',
    description: 'Deixe seu pet limpo e cheiroso com nossos produtos premium e profissionais experientes.',
    image: '/services/bath.jpg',
  },
  {
    title: 'Veterinário',
    description: 'Consultas de rotina, exames e emergências com nossa equipe veterinária dedicada.',
    image: '/services/vet.jpg',
  },
  {
    title: 'Vacinação',
    description: 'Mantenha a saúde do seu amigo em dia com nosso calendário de vacinação completo.',
    image: '/services/vaccine.jpg',
  },
  {
    title: 'Estética',
    description: 'Tratamentos especiais de hidratação, tosa da raça e cuidados estéticos.',
    image: '/services/grooming.jpg',
  },
];

export function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nossos Serviços</h2>
          <p className={styles.subtitle}>
            Oferecemos tudo que seu pet precisa em um só lugar, com o carinho que ele merece.
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
