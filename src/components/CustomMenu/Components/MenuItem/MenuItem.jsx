import React, { isValidElement } from 'react';
import s from './MenuItem.module.scss';
import cx from 'classnames';

const MenuItem = ({
  id,
  selectedValue,
  value,
  icon: Icon,
  itemOnClick = (value) => { },
  children,
}) => {
  return (
    <li
      key={`${id}_${value}`}
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