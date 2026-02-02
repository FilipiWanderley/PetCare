'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';
import clsx from 'clsx';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
  disabled?: boolean;
}

export function Select({
  label,
  error,
  options,
  placeholder = 'Selecione uma opção',
  value,
  onChange,
  className,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={clsx(styles.container, className)} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.wrapper}>
        <div
          className={clsx(
            styles.trigger,
            isOpen && styles.triggerActive,
            error && styles.triggerError,
            disabled && styles.disabled
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        >
          <span className={clsx(!selectedOption && styles.placeholder)}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={20}
            className={clsx(styles.icon, isOpen && styles.iconRotate)}
          />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={styles.optionsList}
              style={{ transformOrigin: "top" }}
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={clsx(
                    styles.option,
                    value === option.value && styles.optionSelected
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                  {value === option.value && <Check size={16} className="text-primary" />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <span className={styles.errorMessage}>
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </div>
  );
}
