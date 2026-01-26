'use client';

import { useState, useEffect } from 'react';
import styles from './TestimonialCard.module.css';

const TESTIMONIALS = [
  {
    quote: "Cuidam com muito carinho e atenção da nossa pet, a equipe é excelente. Os donos são pessoas muito gentis e estão sempre presentes.",
    author: "Juliana Martins"
  },
  {
    quote: "Serviço impecável! Meu Rex nunca foi tão bem tratado. Recomendo de olhos fechados pela confiança e profissionalismo.",
    author: "Ana Silva"
  },
  {
    quote: "Amei o atendimento veterinário. A Dra. explicou tudo com muita paciência e carinho, nos deixando muito tranquilos.",
    author: "Carlos Souza"
  },
  {
    quote: "Melhor banho e tosa da região. A Belinha voltou cheirosa, com um laço lindo e super feliz!",
    author: "Mariana Costa"
  },
  {
    quote: "Profissionais muito qualificados e ambiente super limpo. Sinto total segurança em deixar meus pets com eles.",
    author: "Pedro Santos"
  }
];

export function TestimonialCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
        setIsFading(false);
      }, 500); // Wait for fade out before changing content
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${isFading ? styles.fade : ''}`}>
        <div className={styles.stars}>★★★★★</div>
        <p className={styles.quote}>
          "{TESTIMONIALS[currentIndex].quote}"
        </p>
        <p className={styles.author}>{TESTIMONIALS[currentIndex].author}</p>
      </div>
    </div>
  );
}
