import React, { isValidElement, useId } from 'react';
import s from './MenuItem.module.scss';
import cx from 'classnames';

const MenuItem = ({
  selectedValue,
  value,
  icon: Icon,
  itemOnClick = (value) => { },
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

MenuItem.displayName = 'MenuItem'
export default MenuItem;