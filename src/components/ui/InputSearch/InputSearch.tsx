import { FC } from 'react';
import Icon from '../Icon/Icon';
import styles from './InputSearch.module.scss';

type TProps = {
  onSearchChange: Function;
  value: string;
};

export const InputSearch: FC<TProps> = ({ onSearchChange, value }) => {
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Icon name="search" className={styles.icon}></Icon>
      <input
        type="text"
        id="search"
        placeholder={'Найти...'}
        value={value}
        onChange={onSearch}
      />
    </div>
  );
};
