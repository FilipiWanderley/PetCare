import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './CTA.module.css';

export function CTA() {
  return (
    <div className={styles.container}>
      <section className={styles.cta}>
        <div className={styles.content}>
          <h2>Pronto para cuidar do seu melhor amigo?</h2>
          <p>
            Junte-se a milhares de tutores felizes que confiam no Pet Care para manter seus pets saudáveis e felizes.
          </p>
          <div className={styles.actions}>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Começar Agora
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className={styles.outlineBtn}>
                Ver Serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
