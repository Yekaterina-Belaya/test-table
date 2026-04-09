import { FC, InputHTMLAttributes, useId } from 'react';
import styles from './InputCheckbox.module.scss';

type TProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value'
> & {
  label?: string;
  value?: boolean;
};

export const InputCheckbox: FC<TProps> = 
  ({ label, className, onChange, value, id, ...props }) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    return (
      <div className={`${styles.wrapper} ${className || ''}`}>
        <input
          className={`${styles.hiddenInput}`}
          type="checkbox"
          id={inputId}
          checked={!!value}
          onChange={onChange}
          {...props}
        />
        <span className={styles.checkmark}></span>

        <label htmlFor={inputId} className={styles.label}>
          {label && <span>{label}</span>}
        </label>
      </div>
    );
  }
;

InputCheckbox.displayName = 'InputCheckbox';
