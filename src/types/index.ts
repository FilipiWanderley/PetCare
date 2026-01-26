export type ServiceType = 'banho' | 'tosa' | 'consulta' | 'vacina';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment {
  id: string;
  ownerName: string;
  petName: string;
  service: ServiceType;
  phone: string;
  date: string; // ISO string
  status: AppointmentStatus;
}

export type CreateAppointmentData = Omit<Appointment, 'id' | 'status'>;
