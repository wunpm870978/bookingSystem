import React from 'react';
import s from './CustomSwitch.module.scss';
import cx from 'classnames';

const CustomSwitch = ({
  // className: c = {},
  checked,
  onChange,
}) => {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <label className={s.switch}>
      <input type='checkbox' checked={checked} onChange={handleChange} />
      <span className={cx(s.slider, s.round)}></span>
    </label>
  );
};

export default CustomSwitch;
