import Image from 'next/image';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Renato Santos',
    role: 'Tutor de gato',
    image: '/assets/icons/Picture/Picture1.svg',
    feedback: 'O serviço simplificou o treinamento e me manteve atualizado sobre a saúde do meu amigo peludo. Nunca foi tão fácil proporcionar o melhor para ele. Recomendo a todos os amantes de animais!',
  },
  {
    id: 2,
    name: 'Giovanna Lima',
    role: 'Tutora de cachorro',
    image: '/assets/icons/Picture/Picture2.svg',
    feedback: 'Desde que comecei a usar os serviços, percebi uma mudança positiva no comportamento do meu pet. As dicas de adestramento são valiosas!',
  },
  {
    id: 3,
    name: 'Karla Santana',
    role: 'Tutora de gato',
    image: '/assets/icons/Picture/Picture3.svg',
    feedback: 'O atendimento não apenas me lembra das vacinas e consultas, mas também me conectou a uma comunidade incrível de amantes de animais.',
  },
];

export function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Saiba o que os usuários do <span className={styles.brandName}>Pet <span className={styles.yellow}>Care</span></span> estão achando dos nossos serviços!
        </h2>
        
        <div className={styles.grid}>
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.profileWrapper}>
                  <Image
                    src={testimonial.image}
                    alt={`Foto de ${testimonial.name}`}
                    width={80}
                    height={80}
                    className={styles.profileImage}
                  />
                  <div className={styles.profileInfo}>
                    <h3 className={styles.name}>{testimonial.name}</h3>
                    <p className={styles.role}>{testimonial.role}</p>
                  </div>
                </div>
                <div className={styles.socialIconWrapper}>
                  <Image
                    src="/assets/icons/Picture/Social icon.svg"
                    alt="Ícone social"
                    width={32}
                    height={32}
                  />
                </div>
              </div>
              
              <hr className={styles.divider} />
              
              <div className={styles.cardBody}>
                <p className={styles.feedback}>
                  {testimonial.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
