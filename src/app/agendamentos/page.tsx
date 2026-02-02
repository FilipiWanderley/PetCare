'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { AppointmentForm } from '@/components/features/AppointmentForm';

export default function AppointmentsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.infoColumn}>
            <h1 className={styles.title}>Agende seu Horário</h1>
            <p className={styles.subtitle}>
              Cuidar do seu pet nunca foi tão fácil. Agende serviços de banho, tosa e consultas veterinárias em poucos cliques.
            </p>

            <div className={styles.infoSection}>
              <h2 className={styles.infoTitle}>Como funciona?</h2>
              <ul className={styles.stepsList}>
                <li className={styles.stepItem}>
                  <span className={styles.stepNumber}>1</span>
                  <div>
                    <strong>Selecione o Serviço</strong>
                    <p>Escolha entre banho, tosa, consulta ou outros cuidados especiais.</p>
                  </div>
                </li>
                <li className={styles.stepItem}>
                  <span className={styles.stepNumber}>2</span>
                  <div>
                    <strong>Escolha o Horário</strong>
                    <p>Visualize nossa agenda em tempo real e escolha a melhor data.</p>
                  </div>
                </li>
                <li className={styles.stepItem}>
                  <span className={styles.stepNumber}>3</span>
                  <div>
                    <strong>Confirmação Rápida</strong>
                    <p>Receba a confirmação do seu agendamento instantaneamente.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.benefitsSection}>
              <h2 className={styles.infoTitle}>Por que agendar online?</h2>
              <ul className={styles.benefitsList}>
                <li>✓ Sem espera telefônica</li>
                <li>✓ Disponível 24 horas por dia</li>
                <li>✓ Histórico de atendimentos</li>
                <li>✓ Lembretes automáticos</li>
              </ul>
            </div>

            <div className={styles.hoursSection}>
              <h3 className={styles.hoursTitle}>Horário de Atendimento</h3>
              <p>Segunda a Sexta: 09:00 - 18:00</p>
              <p>Sábado: 09:00 - 14:00</p>
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formWrapper}>
              <AppointmentForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
