import React from 'react';
import { Sale } from '@/hooks/useSales';
import { ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import styles from './SalesList.module.css';
import Image from 'next/image';

interface SalesListProps {
  sales: Sale[];
}

export function SalesList({ sales }: SalesListProps) {
  const getStatusColor = (status: Sale['status']) => {
    switch (status) {
      case 'completed':
        return 'var(--success)';
      case 'pending':
        return 'var(--warning)';
      case 'cancelled':
        return 'var(--error)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status: Sale['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (!sales || sales.length === 0) {
    return (
      <EmptyState
        title="Nenhuma venda realizada"
        description="Parece que ainda não vendemos nada. Que tal divulgar algumas promoções?"
        icon={ShoppingBag}
      />
    );
  }

  return (
    <div className={styles.container}>
      {sales.map((sale) => (
        <div key={sale.id} className={styles.saleItem}>
          <div className={styles.productInfo}>
            <div className={styles.imageWrapper}>
              {sale.image ? (
                <Image
                  src={sale.image}
                  alt={sale.productName}
                  width={48}
                  height={48}
                  className={styles.image}
                />
              ) : (
                <div className={styles.placeholderImage}>
                  <ShoppingBag size={24} />
                </div>
              )}
            </div>
            <div className={styles.details}>
              <h4 className={styles.productName}>{sale.productName}</h4>
              <p className={styles.customerName}>Cliente: {sale.customerName}</p>
            </div>
          </div>

          <div className={styles.metaInfo}>
            <div className={styles.date}>{new Date(sale.date).toLocaleDateString('pt-BR')}</div>
            <div className={styles.amount}>
              {formatCurrency(sale.amount)}
              <span className={styles.quantity}>({sale.quantity}x)</span>
            </div>
            <div className={styles.status} style={{ color: getStatusColor(sale.status) }}>
              {getStatusIcon(sale.status)}
              <span>
                {sale.status === 'completed'
                  ? 'Vendido'
                  : sale.status === 'pending'
                    ? 'Pendente'
                    : 'Cancelado'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
