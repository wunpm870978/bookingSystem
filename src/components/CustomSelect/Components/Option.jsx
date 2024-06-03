import React from 'react';
import s from './Option.module.scss';
import cx from 'classnames';

const Option = ({ value, selectedValue, children, onClick }) => {
  return (
    <li
      className={cx(s.option, { [s.selected]: selectedValue === value })}
      onClick={(e) => onClick(e, children, value)}
    >
      {children}
    </li>
  );
};

Option.displayName = 'SelectOption';
export default Option;