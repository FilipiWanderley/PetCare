import Image from 'next/image';
import { Instagram, Facebook, Phone, MapPin, ArrowRight, PawPrint } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.column}>
          <h3>Serviços</h3>
          <ul className={styles.list}>
            <li><PawPrint size={16} /> Clínica Veterinária</li>
            <li><PawPrint size={16} /> Centro de Estética</li>
            <li><PawPrint size={16} /> Pet Shop</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Horários</h3>
          <ul className={styles.list}>
            <li><strong>Seg-Sex:</strong> 8:00-18:00</li>
            <li><strong>Sábado:</strong> 8:00-17:00</li>
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
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="WhatsApp">
              <Phone size={20} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Localização">
              <MapPin size={20} />
            </a>
          </div>
        </div>

        <div className={`${styles.column} ${styles.logoColumn}`}>
          <Image 
            src="/assets/logo/logo.png" 
            alt="Pet Care Logo" 
            width={180} 
            height={72} 
            className={styles.logoImage}
          />
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
