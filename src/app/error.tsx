'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Ops! Algo deu errado.</h2>
        <p className={styles.message}>
          Não se preocupe, nossos estagiários (caninos) já foram avisados e estão investigando.
        </p>
        <p className={styles.code}>Código do erro: {error.digest || 'Desconhecido'}</p>
        <div className={styles.actions}>
          <Button onClick={reset} variant="primary">
            Tentar Novamente
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="outline">
            Voltar para o Início
          </Button>
        </div>
      </div>
    </div>
  );
}
