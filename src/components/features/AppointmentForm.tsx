'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CreateAppointmentData, ServiceType } from '@/types';
import { useAppointments } from '@/hooks/useAppointments';
import { useAuth } from '@/hooks/useAuth';
import { SERVICE_OPTIONS } from '@/data/services';
import { CheckCircle, Clock, Calendar, User, Dog, Phone, Briefcase } from 'lucide-react'; // Icons
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
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    watch,
    trigger,
  } = useForm<FormInputs>({
    mode: 'onChange', // Real-time validation
  });

  const { addAppointment } = useAppointments();
  const { user } = useAuth();
  const router = useRouter();

  // State for progressive disclosure
  const [activeStep, setActiveStep] = useState(1);
  const [isLoadingStep, setIsLoadingStep] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Watch fields to trigger next steps
  const service = watch('service');
  const dateOnly = watch('dateOnly');
  const timeOnly = watch('timeOnly');
  const ownerName = watch('ownerName');
  const petName = watch('petName');
  const phone = watch('phone');

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      if (user.name) setValue('ownerName', user.name);
      if (user.phone) setValue('phone', user.phone);
    }
  }, [user, setValue]);

  // Progressive Disclosure Logic
  useEffect(() => {
    const checkStep1 = async () => {
      if (service && activeStep < 2) {
        setIsLoadingStep(true);
        await new Promise((resolve) => setTimeout(resolve, 300)); // Short delay for smooth feel
        setActiveStep(2);
        setIsLoadingStep(false);
      }
    };
    checkStep1();
  }, [service, activeStep]);

  useEffect(() => {
    const checkStep2 = async () => {
      if (dateOnly && timeOnly && activeStep < 3) {
        setIsLoadingStep(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setActiveStep(3);
        setIsLoadingStep(false);
      }
    };
    checkStep2();
  }, [dateOnly, timeOnly, activeStep]);

  const onSubmit = async (data: FormInputs) => {
    setSubmitStatus('idle');
    setErrorMessage('');

    // Final validation check
    const isStep1Valid = await trigger('service');
    const isStep2Valid = await trigger(['dateOnly', 'timeOnly']);
    const isStep3Valid = await trigger(['ownerName', 'petName', 'phone']);

    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) return;

    // Combine date and time
    const dateTime = new Date(`${data.dateOnly}T${data.timeOnly}`);

    const appointmentData: CreateAppointmentData = {
      ownerName: data.ownerName,
      petName: data.petName,
      service: data.service as ServiceType,
      date: dateTime.toISOString(),
      phone: data.phone,
    };

    try {
      await addAppointment(appointmentData);
      setSubmitStatus('success');

      // Construct query params for confirmation page (guest support)
      const queryParams = new URLSearchParams({
        ownerName: data.ownerName,
        petName: data.petName,
        service: data.service as string,
        date: dateTime.toISOString(),
        phone: data.phone,
      }).toString();

      setTimeout(() => {
        reset();
        router.push(`/confirm?${queryParams}`);
      }, 1000); // Give user time to see success message
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setErrorMessage('Ocorreu um erro ao realizar o agendamento. Tente novamente.');
    }
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
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }

    setValue('phone', formattedValue, { shouldValidate: true });
  };

  // Calculate progress percentage
  const progress = ((activeStep - 1) / 2) * 100;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Loading Overlay for Step Transitions */}
      {isLoadingStep && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <h2
        style={{
          marginBottom: '0.5rem',
          color: 'var(--foreground)',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Agende seu Horário
      </h2>

      {/* Progress Indicator */}
      <div className={styles.progressContainer}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>

        <div
          className={`${styles.stepIndicator} ${activeStep >= 1 ? styles.stepActive : ''} ${activeStep > 1 ? styles.stepCompleted : ''}`}
        >
          {activeStep > 1 ? <CheckCircle size={16} /> : '1'}
        </div>
        <div
          className={`${styles.stepIndicator} ${activeStep >= 2 ? styles.stepActive : ''} ${activeStep > 2 ? styles.stepCompleted : ''}`}
        >
          {activeStep > 2 ? <CheckCircle size={16} /> : '2'}
        </div>
        <div className={`${styles.stepIndicator} ${activeStep >= 3 ? styles.stepActive : ''}`}>
          3
        </div>
      </div>

      {/* STEP 1: Service Selection */}
      <div className={styles.card}>
        <div className={styles.sectionTitle}>
          <Briefcase size={20} className={styles.icon} />
          Qual serviço seu pet precisa?
        </div>
        <Controller
          name="service"
          control={control}
          rules={{ required: 'Selecione um serviço para continuar' }}
          render={({ field: { onChange, value } }) => (
            <Select
              options={SERVICE_OPTIONS}
              error={errors.service?.message}
              placeholder="Selecione um serviço..."
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>

      {/* STEP 2: Date & Time */}
      <div className={`${styles.stepSection} ${activeStep >= 2 ? styles.stepVisible : ''}`}>
        <div className={styles.card}>
          <div className={styles.sectionTitle}>
            <Calendar size={20} />
            Quando podemos atender?
          </div>
          <div className={styles.grid}>
            <Input
              type="date"
              label="Data"
              error={errors.dateOnly?.message}
              {...register('dateOnly', {
                required: 'Data é obrigatória',
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  return selectedDate >= now || 'A data deve ser futura';
                },
              })}
            />
            <Controller
              name="timeOnly"
              control={control}
              rules={{ required: 'Horário é obrigatório' }}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Horário"
                  options={timeOptions}
                  placeholder="Horário..."
                  error={errors.timeOnly?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* STEP 3: Personal Details */}
      <div className={`${styles.stepSection} ${activeStep >= 3 ? styles.stepVisible : ''}`}>
        <div className={styles.card}>
          <div className={styles.sectionTitle}>
            <User size={20} />
            Quem vamos receber?
          </div>
          <div className={styles.grid}>
            <Input
              label="Seu Nome"
              placeholder="Nome completo"
              error={errors.ownerName?.message}
              {...register('ownerName', { required: 'Seu nome é obrigatório' })}
            />
            <Input
              label="Telefone/WhatsApp"
              placeholder="(00) 00000-0000"
              error={errors.phone?.message}
              {...register('phone', {
                required: 'Telefone é obrigatório',
                pattern: {
                  value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                  message: 'Formato inválido',
                },
                onChange: handlePhoneChange,
              })}
            />
            <Input
              label="Nome do Pet"
              placeholder="Nome do pet"
              error={errors.petName?.message}
              {...register('petName', { required: 'Nome do pet é obrigatório' })}
            />
          </div>
        </div>
      </div>

      {/* Submit Action */}
      {activeStep === 3 && (
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting || submitStatus === 'success'}
          >
            {submitStatus === 'success' ? 'Agendado!' : 'Confirmar Agendamento'}
          </Button>

          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              <CheckCircle size={20} />
              <span>Agendamento realizado com sucesso! Redirecionando...</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
