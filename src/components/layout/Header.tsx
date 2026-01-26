'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import styles from './Header.module.css';

export function Header() {
  const { isAuthenticated, signOut } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.header} ${isHome ? styles.transparent : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image 
            src="/assets/logo/pet1.png" 
            alt="Pet Care Logo" 
            width={250} 
            height={100} 
            className={styles.logoImage}
            priority
          />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`} onClick={closeMenu}>Início</Link>
          <Link href="/produtos" className={`${styles.navLink} ${pathname === '/produtos' ? styles.active : ''}`} onClick={closeMenu}>Produtos</Link>
          <Link href="/agendamentos" className={`${styles.navLink} ${pathname === '/agendamentos' ? styles.active : ''}`} onClick={closeMenu}>Agendamentos</Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className={`${styles.btn} ${styles.btnTurquoise}`} onClick={closeMenu}>Dashboard</Link>
              <button onClick={() => { signOut(); closeMenu(); }} className={styles.logoutBtn} title="Sair">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link href="/login" className={`${styles.btn} ${styles.btnLogin}`} onClick={closeMenu}>
              <Image 
                src="/assets/logo/innerlogo.png" 
                alt="Ícone" 
                width={20} 
                height={20}
                className={styles.loginIcon}
              />
              Login
            </Link>
          )}
        </nav>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu}></div>
        )}
      </div>
    </header>
  );
}
