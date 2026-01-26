'use client';

import styles from './page.module.css';
import { AppointmentForm } from '@/components/features/AppointmentForm';

export default function AppointmentsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Agende seu Horário</h1>
        <p className={styles.subtitle}>
          Escolha o melhor dia e horário para cuidar do seu pet com todo carinho e atenção.
        </p>
        
        <div className={styles.formWrapper}>
          <AppointmentForm />
        </div>
      </div>
    </main>
  );
}
