import React from 'react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
}

export function StatsCard({ title, value, icon, variant = 'primary' }: StatsCardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
}
