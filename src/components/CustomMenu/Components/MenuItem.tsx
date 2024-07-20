import React, { isValidElement, useId, ReactNode, FC } from 'react';
import s from './MenuItem.module.scss';
import cx from 'classnames';
import noop from 'lodash/noop';

export interface MenuItemProps {
  selectedValue?: string,
  value: string,
  icon: ReactNode,
  itemOnClick?: (value: string) => void,
  children: ReactNode,
}

const MenuItem: FC<MenuItemProps> = ({
  selectedValue='',
  value,
  icon: Icon,
  itemOnClick = (value: string) => { },
  children,
}) => {
  const id = useId();

  return (
    <li
      key={`${id}_menu_option_${value}`}
      className={cx(s.item, selectedValue === value && s.selected)}
      onClick={() => itemOnClick(value)}
    >
      {isValidElement(Icon) && Icon}
      <h3>
        {children}
      </h3>
    </li>
  )
}

MenuItem.displayName = 'MenuItem';
export default MenuItem;