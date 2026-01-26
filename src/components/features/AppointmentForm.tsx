'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CreateAppointmentData, ServiceType } from '@/types';
import { useAppointments } from '@/hooks/useAppointments';
import { SERVICE_OPTIONS } from '@/data/services';
import styles from './AppointmentForm.module.css';

type FormInputs = {
  service: ServiceType | '';
  dateOnly: string;
  timeOnly: string;
  ownerName: string;
  petName: string;
  phone: string;
};

export function AppointmentForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<FormInputs>();
  
  const { addAppointment } = useAppointments();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async (data: FormInputs) => {
    // Simulação de delay para feedback visual
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Combine date and time
    const dateTime = new Date(`${data.dateOnly}T${data.timeOnly}`);
    
    const appointmentData: CreateAppointmentData = {
      ownerName: data.ownerName,
      petName: data.petName,
      service: data.service as ServiceType,
      date: dateTime.toISOString(),
      phone: data.phone
    };

    addAppointment(appointmentData);
    setShowSuccessModal(true);
    
    // Wait a bit before redirecting, or let user click button in modal
    // Here we will auto-redirect after 2 seconds for smooth UX
    setTimeout(() => {
        reset();
        router.push('/confirm');
    }, 2000);
  };

  // Generate time slots (09:00 to 18:00)
  const timeOptions = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9;
    const time = `${hour.toString().padStart(2, '0')}:00`;
    return { label: time, value: time };
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formattedValue = value;
    
    if (value.length > 10) {
      // Format: (XX) XXXXX-XXXX
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      // Format: (XX) ...
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    
    setValue('phone', formattedValue, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 style={{ marginBottom: '1rem', color: 'var(--foreground)', fontSize: '1.25rem', fontWeight: 'bold' }}>
        Novo Agendamento
      </h2>

      {/* Serviço */}
      <Select
        label="Serviço *"
        options={SERVICE_OPTIONS}
        error={errors.service?.message}
        placeholder="Selecione um serviço"
        {...register('service', { required: 'Selecione um serviço' })}
      />

      {/* Data */}
      <Input
        label="Data *"
        type="date"
        placeholder="dd/mm/aaaa"
        error={errors.dateOnly?.message}
        {...register('dateOnly', { 
          required: 'Data é obrigatória',
          validate: (value) => {
            const selectedDate = new Date(value);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return selectedDate >= now || 'A data deve ser futura';
          }
        })}
      />

      {/* Horário */}
      <Select
        label="Horário *"
        options={timeOptions}
        placeholder="Selecione um horário"
        error={errors.timeOnly?.message}
        {...register('timeOnly', { required: 'Horário é obrigatório' })}
      />

      {/* Nome do Tutor */}
      <Input
        label="Nome do Tutor *"
        placeholder="Seu nome completo"
        error={errors.ownerName?.message}
        {...register('ownerName', { required: 'Nome é obrigatório' })}
      />

      {/* Nome do Pet */}
      <Input
        label="Nome do Pet *"
        placeholder="Nome do seu pet"
        error={errors.petName?.message}
        {...register('petName', { required: 'Nome do pet é obrigatório' })}
      />

      {/* Telefone */}
      <Input
        label="Telefone *"
        placeholder="(11) 99999-9999"
        error={errors.phone?.message}
        {...register('phone', { 
          required: 'Telefone é obrigatório',
          pattern: {
            value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
            message: 'Formato inválido: (99) 99999-9999 ou (99) 9999-9999'
          },
          onChange: handlePhoneChange
        })}
      />

      <Button 
        type="submit" 
        fullWidth 
        isLoading={isSubmitting} 
        className={styles.submitButton}
        variant="success"
      >
        Confirmar agendamento
      </Button>
    </form>
  );
}
