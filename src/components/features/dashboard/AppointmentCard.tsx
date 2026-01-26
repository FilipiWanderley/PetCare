import { Appointment } from '@/types';
import { Button } from '@/components/ui/Button';
import { useAppointments } from '@/hooks/useAppointments';
import styles from './AppointmentCard.module.css';

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { confirmAppointment, cancelAppointment, removeAppointment } = useAppointments();

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`${styles.card} ${styles[appointment.status]}`}>
      <div className={styles.header}>
        <h3>{appointment.petName} <span className={styles.owner}>({appointment.ownerName})</span></h3>
        <span className={`${styles.statusBadge} ${styles[appointment.status]}`}>
          {appointment.status === 'pending' && 'Pendente'}
          {appointment.status === 'confirmed' && 'Confirmado'}
          {appointment.status === 'cancelled' && 'Cancelado'}
        </span>
      </div>
      
      <div className={styles.details}>
        <p><strong>Serviço:</strong> <span style={{ textTransform: 'capitalize' }}>{appointment.service}</span></p>
        <p><strong>Data:</strong> {formatDate(appointment.date)}</p>
        <p><strong>Telefone:</strong> {appointment.phone}</p>
      </div>

      <div className={styles.actions}>
        {appointment.status === 'pending' && (
          <>
            <Button size="sm" variant="secondary" onClick={() => confirmAppointment(appointment.id)}>Confirmar</Button>
            <Button size="sm" variant="danger" onClick={() => cancelAppointment(appointment.id)}>Cancelar</Button>
          </>
        )}
        <Button size="sm" variant="outline" onClick={() => removeAppointment(appointment.id)}>Remover</Button>
      </div>
    </div>
  );
}
