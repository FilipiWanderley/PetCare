'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppointments } from '@/hooks/useAppointments';

export default function ConfirmPage() {
  const { appointments } = useAppointments();
  const [lastAppointment, setLastAppointment] = useState(appointments?.[0]);

  useEffect(() => {
    if (appointments && appointments.length > 0) {
      setLastAppointment(appointments[0]);
    }
  }, [appointments]);

  if (!lastAppointment) {
    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <CheckCircle size={48} />
          </div>
          <h1 className={styles.title}>Agendamento Confirmado!</h1>
          <p className={styles.message}>
            Nenhum agendamento recente encontrado.
          </p>
          <div className={styles.actions}>
            <Link href="/" style={{ width: '100%' }}>
              <Button variant="outline" fullWidth>
                Voltar para o início
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <CheckCircle size={48} />
        </div>
        
        <h1 className={styles.title}>Agendamento Confirmado!</h1>
        <p className={styles.message}>
          Obrigado, <strong>{lastAppointment.ownerName}</strong>! O agendamento para <strong>{lastAppointment.petName}</strong> foi recebido com sucesso.
        </p>

        <div className={styles.details}>
          <h3>Detalhes do Agendamento</h3>
          <div className={styles.detailRow}>
            <span className={styles.label}>Serviço:</span>
            <span className={styles.value}>{lastAppointment.service}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Telefone:</span>
            <span className={styles.value}>{lastAppointment.phone}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Data:</span>
            <span className={styles.value}>{formatDate(lastAppointment.date)}</span>
          </div>
          <div className={styles.detailRow}>
             <span className={styles.label}>Status:</span>
             <span className={styles.value} style={{ color: 'var(--secondary)' }}>Pendente</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/" style={{ width: '100%' }}>
            <Button variant="outline" fullWidth>
              Voltar para o início
            </Button>
          </Link>
          <Link href="/dashboard" style={{ width: '100%' }}>
            <Button variant="primary" fullWidth>
              Acessar Agenda
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
