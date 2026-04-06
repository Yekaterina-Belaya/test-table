import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useId,
  useState,
} from 'react';
import Icon from '../Icon/Icon';
import styles from './InputText.module.scss';

type TInputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  type: 'text' | 'password';
  label?: string;
  icon?: string;
  clearable?: boolean;
};

const InputText = forwardRef<HTMLInputElement, TInputTextProps>(
  (
    {
      label,
      className = '',
      id,
      type,
      clearable,
      icon,
      onChange,
      value,
      name,
      ...props
    },
    ref
  ) => {
    const [isVisible, setVisible] = useState(false);
    const generatedId = useId();
    const inputId = id || generatedId;

    const inputType = type === 'password' && isVisible ? 'text' : type;

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { name: name, value: '' },
        } as ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const toggleVisible = () => setVisible((prev) => !prev);

    return (
      <div className={styles.input}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.wrapper}>
          {icon && <Icon name={icon} className={styles.icon} />}
          <input
            ref={ref}
            type={inputType}
            id={inputId}
            value={value ?? ''}
            onChange={onChange}
            {...props}
          />
          {clearable && (
            <Icon
              name="cross"
              className={`${styles.icon} ${styles.hover}`}
              onClick={handleClear}
            />
          )}
          {type === 'password' && (
            <Icon
              name={isVisible ? 'eyeOff' : 'eye'}
              className={`${styles.icon} ${styles.hover}`}
              onClick={toggleVisible}
            ></Icon>
          )}
        </div>
      </div>
    );
  }
);

InputText.displayName = 'InputText';

export default InputText;
