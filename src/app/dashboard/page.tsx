'use client';

import { useState } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { useSales } from '@/hooks/useSales';
import { useAuth } from '@/hooks/useAuth';
import { StatsCard } from '@/components/features/dashboard/StatsCard';
import { AppointmentCard } from '@/components/features/dashboard/AppointmentCard';
import { SalesList } from '@/components/features/dashboard/SalesList';
import { Calendar, LogOut, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { filterAppointments } from '@/utils/dashboard';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const { appointments, stats, isLoading } = useAppointments();
  const { sales, stats: salesStats } = useSales();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAppointments = filterAppointments(appointments, searchTerm, statusFilter);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <Skeleton width={200} height={32} borderRadius={4} className={styles.skeletonItem} />
          <Skeleton width={300} height={20} borderRadius={4} className={styles.skeletonItem} />
        </div>

        <div className={styles.statsGrid}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={120} borderRadius={8} className={styles.skeletonCard} />
          ))}
        </div>

        <div className={styles.dashboardGrid}>
          <Skeleton height={400} borderRadius={8} />
          <Skeleton height={400} borderRadius={8} />
        </div>
      </main>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Dashboard Administrativo</h1>
            <p>Olá, {user?.name || 'Admin'}. Visão geral do negócio.</p>
          </div>
          <button
            onClick={signOut}
            className={styles.mobileLogout}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ef4444',
              display: 'none',
            }}
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <StatsCard
          title="Receita Total"
          value={formatCurrency(salesStats.totalRevenue)}
          icon={<DollarSign size={24} />}
          variant="success"
        />
        <StatsCard
          title="Vendas Realizadas"
          value={salesStats.totalSales}
          icon={<ShoppingBag size={24} />}
          variant="primary"
        />
        <StatsCard
          title="Ticket Médio"
          value={formatCurrency(salesStats.averageTicket)}
          icon={<TrendingUp size={24} />}
          variant="warning"
        />
        <StatsCard
          title="Agendamentos Hoje"
          value={stats.pending} // Usando pending como proxy para hoje/próximos por enquanto
          icon={<Calendar size={24} />}
          variant="primary"
        />
      </section>

      <div className={styles.dashboardGrid}>
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Saídas de Produtos (Vendas)</h2>
          </div>
          <SalesList sales={sales} />
        </section>

        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Agendamentos Recentes</h2>
          </div>

          <div className={styles.filters}>
            <div className={styles.searchFilter}>
              <Input
                placeholder="Buscar agendamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.statusFilter}>
              <Select
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
                options={[
                  { label: 'Todos', value: 'all' },
                  { label: 'Pendentes', value: 'pending' },
                  { label: 'Confirmados', value: 'confirmed' },
                  { label: 'Cancelados', value: 'cancelled' },
                ]}
              />
            </div>
          </div>

          {filteredAppointments.length > 0 ? (
            <div className={styles.appointmentsGrid}>
              {filteredAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Agenda livre!"
              description="Nenhum agendamento encontrado para os filtros selecionados. Aproveite para organizar o espaço!"
              icon={Calendar}
            />
          )}
        </section>
      </div>
    </main>
  );
}
