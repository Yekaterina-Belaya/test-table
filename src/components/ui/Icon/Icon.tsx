  import React from 'react';
  import clsx from 'clsx';
  import ArrowUp from '@/assets/icons/arrow_up.svg?react';
  import ArrowsClockwise from '@/assets/icons/arrows_clockwise.svg?react';
  import CaretLeft from '@/assets/icons/caret_left.svg?react';
  import Cross from '@/assets/icons/cross.svg?react';
  import EyeOff from '@/assets/icons/eye_off.svg?react';
  import Eye from '@/assets/icons/eye.svg?react';
  import Lock from '@/assets/icons/lock.svg?react';
  import Logo from '@/assets/icons/logo.svg?react';
  import PlusCircle from '@/assets/icons/plus_circle.svg?react';
  import Dots from '@/assets/icons/dots.svg?react';
  import Search from '@/assets/icons/search.svg?react';
  import User from '@/assets/icons/user.svg?react';
  import styles from './Icon.module.scss';

  const iconMap = {
    arrowUp: ArrowUp,
    arrowsClockwise: ArrowsClockwise,
    caretLeft: CaretLeft,
    cross: Cross,
    eyeOff: EyeOff,
    eye: Eye,
    lock: Lock,
    logo: Logo,
    plusCircle: PlusCircle,
    dots: Dots,
    search: Search,
    user: User
  };

  export type IconName = keyof typeof iconMap;

  interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName | string;
    size?: 'sm' | 'md' | 'lg' | 'xs';
  }

  const Icon = ({ name, size = 'md', className, ...props }: IconProps) => {
    const SVGComponent = iconMap[name];

    if (!SVGComponent) {
      console.warn(`Icon "${name}" not found.`);
      return null;
    }

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