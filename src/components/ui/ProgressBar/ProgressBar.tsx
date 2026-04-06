import * as Progress from '@radix-ui/react-progress';
import styles from './ProgressBar.module.scss';

type TProgressBarProps = {
  isFetching: boolean;
}

export const ProgressBar = ({ isFetching }: TProgressBarProps) => {
  if (!isFetching) return null;

  return (
    <Progress.Root className={styles.root} value={null}>
      <Progress.Indicator className={styles.indicator} />
    </Progress.Root>
  );
};