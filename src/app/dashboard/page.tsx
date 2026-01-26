'use client';

import { useState } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { useAuth } from '@/hooks/useAuth';
import { StatsCard } from '@/components/features/dashboard/StatsCard';
import { AppointmentCard } from '@/components/features/dashboard/AppointmentCard';
import { Calendar, CheckCircle, Clock, XCircle, Search, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const { appointments, stats } = useAppointments();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = 
      apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Dashboard Administrativo</h1>
            <p>Olá, {user?.name || 'Admin'}. Visão geral dos agendamentos.</p>
          </div>
          <button 
            onClick={signOut}
            className={styles.mobileLogout}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#ef4444',
              display: 'none' // Hidden by default, shown in mobile via CSS if needed, but header has it
            }}
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <StatsCard 
          title="Total de Agendamentos" 
          value={stats.total} 
          icon={<Calendar size={24} />} 
          variant="primary" 
        />
        <StatsCard 
          title="Confirmados" 
          value={stats.confirmed} 
          icon={<CheckCircle size={24} />} 
          variant="success" 
        />
        <StatsCard 
          title="Pendentes" 
          value={stats.pending} 
          icon={<Clock size={24} />} 
          variant="warning" 
        />
        <StatsCard 
          title="Cancelados" 
          value={stats.cancelled} 
          icon={<XCircle size={24} />} 
          variant="danger" 
        />
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Agendamentos Recentes</h2>
        
        <div className={styles.filters}>
          <div className={styles.searchFilter}>
            <Input 
              placeholder="Buscar por pet ou dono..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // icon={<Search size={18} />} // Se Input suportasse ícone
            />
          </div>
          <div className={styles.statusFilter}>
            <Select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: 'Todos os Status', value: 'all' },
                { label: 'Pendentes', value: 'pending' },
                { label: 'Confirmados', value: 'confirmed' },
                { label: 'Cancelados', value: 'cancelled' },
              ]}
            />
          </div>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className={styles.appointmentsGrid}>
            {filteredAppointments.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Nenhum agendamento encontrado.</p>
          </div>
        )}
      </section>
    </main>
  );
}
