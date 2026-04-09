import * as Progress from '@radix-ui/react-progress';
import styles from './ProgressBar.module.scss';
import { FC } from 'react';

type TProps = {
  isFetching: boolean;
};

export const ProgressBar: FC<TProps> = ({ isFetching }) => {
  if (!isFetching) return null;

  return (
    <Progress.Root className={styles.root} value={null}>
      <Progress.Indicator className={styles.indicator} />
    </Progress.Root>
  );
};
