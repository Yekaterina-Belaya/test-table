import { forwardRef, InputHTMLAttributes, useId } from "react";
import styles from './InputCheckbox.module.scss'

type TInputCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  label?: string;
  value?: boolean;
}

export const InputCheckbox = forwardRef<HTMLInputElement, TInputCheckboxProps>(
  ({ label, className, onChange, value, id, ...props }, ref) => {
      const generatedId = useId();
      const inputId = id || generatedId;
    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
          <input
          className={`${styles.hiddenInput}`}
            type="checkbox"
            ref={ref}
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
);

InputCheckbox.displayName = "InputCheckbox";