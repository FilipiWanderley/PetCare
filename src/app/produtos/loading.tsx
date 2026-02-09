import { Skeleton } from '@/components/ui/Skeleton';
import styles from './page.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Nossos Produtos</h1>
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.card} style={{ border: '1px solid var(--border-color)' }}>
            <Skeleton width="100%" height={200} borderRadius={8} className={styles.skeletonImage} />
            <div style={{ marginTop: '1rem' }}>
              <Skeleton width="60%" height={24} borderRadius={4} />
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <Skeleton width="40%" height={20} borderRadius={4} />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Skeleton width="100%" height={40} borderRadius={8} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
