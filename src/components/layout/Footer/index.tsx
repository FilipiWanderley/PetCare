import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h3>PetCare</h3>
          <p>Cuidando do seu melhor amigo com amor e dedicação.</p>
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
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} PetCare. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
