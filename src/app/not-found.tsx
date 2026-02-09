import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Ops! Página não encontrada</h2>
        <p className={styles.description}>
          Parece que você se perdeu. Assim como um cachorrinho que fugiu do quintal, esta página não
          está onde deveria estar.
        </p>
        <Link href="/">
          <Button size="lg">Voltar para o Início</Button>
        </Link>
      </div>
    </div>
  );
}
