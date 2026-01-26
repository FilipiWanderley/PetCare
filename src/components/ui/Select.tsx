import { SelectHTMLAttributes, forwardRef } from 'react';
import styles from './Select.module.css';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    return (
      <div className={clsx(styles.container, className)}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.wrapper}>
          <select
            ref={ref}
            className={clsx(styles.select, error && styles.hasError)}
            defaultValue=""
            {...props}
          >
            <option value="" disabled>
              {placeholder || 'Selecione uma opção'}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className={styles.iconWrapper}>
            <ChevronDown size={20} />
          </div>
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
