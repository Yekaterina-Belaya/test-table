import { FC } from 'react';
import Icon, { IconName } from '../Icon/Icon';
import styles from './Button.module.scss';

type TProps = {
  type?: 'submit' | 'reset' | 'button';
  level?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  shape?: 'square' | 'rounded';
  styleProps?: object;
  icon?: IconName;
  text?: string;
  onClick?: Function;
  isDisabled?: boolean;
};

export const Button: FC<TProps> = ({
  type = 'button',
  level = 'secondary',
  size = 'medium',
  shape = 'square',
  styleProps,
  icon,
  text,
  onClick,
  isDisabled,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[size]} ${styles[shape]} ${styles[level]}`}
      style={styleProps}
      onClick={() => onClick ? onClick() : null}
      disabled={isDisabled}
    >
      {icon ? <Icon name={icon}></Icon> : null}
      {text}
    </button>
  );
};
