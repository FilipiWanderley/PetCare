import Image from 'next/image';
import { Instagram } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Image 
              src="/assets/logo/logo.png" 
              alt="Pet Care Logo" 
              width={240} 
              height={96} 
              className={styles.logoImage}
            />
          </div>
          <p>
            O melhor cuidado para o seu melhor amigo. Oferecemos serviços de banho, tosa e veterinária com profissionais qualificados e muito amor.
          </p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.column}>
            <h4>Institucional</h4>
            <a href="#">Sobre nós</a>
            <a href="#">Nossos Serviços</a>
            <a href="#">Profissionais</a>
          </div>
          <div className={styles.column}>
            <h4>Contato</h4>
            <a href="#">(11) 99999-9999</a>
            <a href="#">contato@petcare.com</a>
            <a href="#">Rua dos Pets, 123</a>
            <div className={styles.social}>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} PetCare. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
