import Image from 'next/image';
import { Instagram, Phone, ArrowRight, PawPrint } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={`${styles.column} ${styles.logoColumn}`}>
          <Image 
            src="/assets/logo/pet 1.png" 
            alt="Pet Care Logo" 
            width={240} 
            height={96} 
            className={styles.logoImage}
          />
        </div>

        <div className={styles.column}>
          <h3>Serviços</h3>
          <ul className={styles.list}>
            <li><PawPrint size={16} /> Banho e Tosa</li>
            <li><PawPrint size={16} /> Consulta Veterinária</li>
            <li><PawPrint size={16} /> Vacinação</li>
            <li><PawPrint size={16} /> Hospedagem</li>
            <li><PawPrint size={16} /> Adestramento</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Horários</h3>
          <ul className={styles.list}>
            <li><strong>Seg-Sáb:</strong> 9:00-18:00</li>
            <li><strong>Domingo:</strong> Fechado</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Localização</h3>
          <p>Rua dos Pets, 123</p>
          <p>Bairro Feliz</p>
          <p>São Paulo - SP, 00000-000</p>
          <a href="#" className={styles.locationLink}>
            <ArrowRight size={16} /> Veja como chegar
          </a>
        </div>

        <div className={styles.column}>
          <div className={styles.socialGrid}>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Telefone">
              <Phone size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.copyrightBar}>
        <div className={styles.copyrightContent}>
          <p>&copy; {new Date().getFullYear()} PetCare | <a href="#">Política de Privacidade</a> | <a href="#">Site Map</a> | <a href="#">Contato</a></p>
        </div>
      </div>
    </footer>
  );
}
