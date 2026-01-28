import Image from 'next/image';
import styles from './TestimonialsSection.module.css';

interface Testimonial {
  id?: string | number;
  name: string;
  role: string;
  image: string;
  feedback: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Saiba o que os usuários do <span className={styles.brandName}>Pet <span className={styles.yellow}>Care</span></span> estão achando dos nossos serviços!
        </h2>
        
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className={styles.card}>
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
