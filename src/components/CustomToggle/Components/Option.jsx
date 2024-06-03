import React, { useId } from 'react';
import s from './Option.module.scss';
import cx from 'classnames';

const Option = React.forwardRef(
  ({ children, value, onChange, selectedValue }, ref) => {
    const key = useId();
    return (
      <li
        key={key}
        ref={ref}
        className={cx(s.option, { [s.selected]: selectedValue === value })}
        onClick={() => onChange(value)}
      >
        {children}
      </li>
    );
  }
);

Option.displayName = 'ToggleOption';
export default Option;