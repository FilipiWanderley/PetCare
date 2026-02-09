import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
  actionLink,
  onAction,
}: EmptyStateProps) {
  return (
    <div className={styles.container}>
      {Icon && <Icon className={styles.icon} size={64} />}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      {actionLabel && (actionLink || onAction) && (
        <div className={styles.action}>
          {actionLink ? (
            <Link href={actionLink}>
              <Button>{actionLabel}</Button>
            </Link>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  );
}
