import React, { useRef } from 'react';
import s from './CustomButton.module.scss';
import cx from 'classnames';

const CustomButton = ({
  isLoading = false,
  disabled = false,
  className: c = '',
  onClick,
  children,
}) => {
  const btnRef = useRef(null);

  const onMouseMove = (e) => {
    const { left, top } = btnRef.current.getBoundingClientRect();
    btnRef.current.style.setProperty('--mouse-x', e.clientX - left + 'px');
    btnRef.current.style.setProperty('--mouse-y', e.clientY - top + 'px');
  };
  return (
    <button
      ref={btnRef}
      className={cx(s.button, c, {
        [s.loading]: isLoading,
        [s.disabled]: disabled,
      })}
      onClick={!(isLoading || disabled) && onClick}
      onMouseMove={onMouseMove}
    >
      {isLoading && <span className={s.loader} />}
      <span className={s.childrenWrapper}>{children}</span>
    </button>
  );
};

export default CustomButton;
