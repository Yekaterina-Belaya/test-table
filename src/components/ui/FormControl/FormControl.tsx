import { FC, PropsWithChildren } from 'react';
import styles from './FormControl.module.scss';

type TProps = {
  error?: string;
} & PropsWithChildren;

export const FormControl: FC<TProps> = ({ children, error }) => {
  return (
    <div className={styles.control}>
      <div>{children}</div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
