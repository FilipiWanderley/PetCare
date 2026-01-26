import styles from './TestimonialCard.module.css';

export function TestimonialCard() {
  return (
    <div className={styles.container}>
      <div className={styles.stars}>★★★★★</div>
      <p className={styles.quote}>
        "Cuidam com muito carinho e atenção da nossa pet, a equipe é excelente.
        Os donos são pessoas muito gentis e estão sempre presentes."
      </p>
      <p className={styles.author}>Filipi Moraes</p>
    </div>
  );
}
