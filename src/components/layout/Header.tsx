'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import styles from './Header.module.css';

export function Header() {
  const { isAuthenticated, signOut } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className={`${styles.header} ${isHome ? styles.transparent : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/assets/logo/logo.png" 
            alt="Pet Care Logo" 
            width={250} 
            height={100} 
            className={styles.logoImage}
            priority
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Início</Link>
          <Link href="/produtos" className={styles.navLink}>Produtos</Link>
          <Link href="/agendamentos" className={styles.navLink}>Agendamentos</Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className={`${styles.btn} ${styles.btnTurquoise}`}>Dashboard</Link>
              <button onClick={signOut} className={styles.logoutBtn} title="Sair">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link href="/login" className={`${styles.btn} ${styles.btnLogin}`}>
              <Image 
                src="/assets/logo/icone.png" 
                alt="Ícone" 
                width={20} 
                height={20}
                className={styles.loginIcon}
              />
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
