'use client';

import { useEffect } from 'react';
import styles from './error.module.css'; // Reusing existing error styles
import { Button } from '@/components/ui/Button';

// Global Error must be a Client Component
// It catches errors in the root layout!
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service (e.g. Sentry)
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Erro Crítico no Sistema</h1>
            <p className={styles.description}>
              Ocorreu uma falha irrecuperável na aplicação. Nossa equipe técnica já foi notificada.
            </p>
            {error.digest && <p className={styles.digest}>Código do erro: {error.digest}</p>}
            <div className={styles.actions}>
              <Button onClick={() => reset()} variant="primary">
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
