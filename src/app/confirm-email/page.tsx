
import { verifyEmail } from '@/actions/auth-actions';
import Link from 'next/link';
import styles from './page.module.css';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ConfirmEmailPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ConfirmEmailPage({ searchParams }: ConfirmEmailPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <XCircle className={styles.errorIcon} />
          <h1 className={styles.title}>Link Inválido</h1>
          <p className={styles.message}>
            O link de confirmação é inválido ou está faltando o token.
          </p>
          <Link href="/login" className={styles.button}>
            Voltar para Login
          </Link>
        </div>
      </div>
    );
  }

  const result = await verifyEmail(token);

  if (result.success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <CheckCircle2 className={styles.successIcon} />
          <h1 className={styles.title}>E-mail Confirmado!</h1>
          <p className={styles.message}>
            Sua conta foi ativada com sucesso. Clique abaixo para fazer login.
          </p>
          <Link href="/login" className={styles.button}>
            Ir para Login
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <XCircle className={styles.errorIcon} />
          <h1 className={styles.title}>Erro na Confirmação</h1>
          <p className={styles.message}>
            {result.error || 'Não foi possível confirmar seu e-mail. O link pode ter expirado.'}
          </p>
          <Link href="/login" className={styles.button}>
            Voltar para Login
          </Link>
        </div>
      </div>
    );
  }
}
