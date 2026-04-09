import React, { FC } from 'react';
import clsx from 'clsx';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import ArrowsClockwise from '@/assets/icons/arrows_clockwise.svg?react';
import CaretLeft from '@/assets/icons/caret_left.svg?react';
import CaretRight from '@/assets/icons/caretRight.svg?react';
import Cross from '@/assets/icons/cross.svg?react';
import EyeOff from '@/assets/icons/eye_off.svg?react';
import Eye from '@/assets/icons/eye.svg?react';
import Lock from '@/assets/icons/lock.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import Plus from '@/assets/icons/plus.svg?react';
import PlusCircle from '@/assets/icons/plus_circle.svg?react';
import Dots from '@/assets/icons/dots.svg?react';
import Search from '@/assets/icons/search.svg?react';
import SortDesc from '@/assets/icons/sortDesc.svg?react';
import SortAsc from '@/assets/icons/sortAsc.svg?react';
import SortDefault from '@/assets/icons/sortDefault.svg?react';
import User from '@/assets/icons/user.svg?react';
import styles from './Icon.module.scss';

const iconMap = {
  arrowUp: ArrowUp,
  arrowsClockwise: ArrowsClockwise,
  caretLeft: CaretLeft,
  caretRight: CaretRight,
  cross: Cross,
  eyeOff: EyeOff,
  eye: Eye,
  lock: Lock,
  logo: Logo,
  plus: Plus,
  plusCircle: PlusCircle,
  dots: Dots,
  search: Search,
  sortDesc: SortDesc,
  sortAsc: SortAsc,
  sortDefault: SortDefault,
  user: User,
};

export type IconName = keyof typeof iconMap;

type TProps = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xs';
};

const Icon: FC<TProps> = ({ name, size = 'md', className, ...props }) => {
  const SVGComponent = iconMap[name];

  return (
    <SVGComponent
      className={clsx(styles.icon, styles[size], className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
};

export default Icon;
