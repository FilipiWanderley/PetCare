'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroCarousel.module.css';

const IMAGES = [
  '/assets/images/cachorro1.jpg',
  '/assets/images/cachorro2.jpg',
  '/assets/images/cachorro3.jpg',
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextSlide, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Hero Image Carousel"
    >
      {IMAGES.map((src, index) => (
        <div
          key={src}
          className={`${styles.imageWrapper} ${
            index === currentIndex ? styles.active : ''
          }`}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            className={styles.image}
            sizes="100vw"
            unoptimized
          />
        </div>
      ))}
      
      <div className={styles.overlay} />

      {/* Navigation Controls */}
      <button 
        className={`${styles.arrow} ${styles.prev}`} 
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        className={`${styles.arrow} ${styles.next}`} 
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots Indicators */}
      <div className={styles.dots}>
        {IMAGES.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}
