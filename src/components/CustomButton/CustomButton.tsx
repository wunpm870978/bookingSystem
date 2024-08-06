import React, {
  FC,
  forwardRef,
  MouseEventHandler,
  ReactNode,
  MouseEvent,
  useId,
} from 'react';
import s from './CustomButton.module.scss';
import cx from 'classnames';

interface CustomButtonProps {
  loading: boolean,
  disabled: boolean,
  className?: string,
  onClick: MouseEventHandler,
  btnRef?: HTMLButtonElement,
  children: ReactNode,
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(({
  loading = false,
  disabled = false,
  className,
  onClick,
  children,
}, ref) => {
  const id = useId();

  const onMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!(loading || disabled)) {
      const btn = document.getElementById(`btn_${id}`);
      if (btn) {
        const { left, top } = btn.getBoundingClientRect();
        btn.style.setProperty('--mouse-x', e.clientX - left + 'px');
        btn.style.setProperty('--mouse-y', e.clientY - top + 'px');
      }
    }
  };
  return (
    <button
      id={`btn_${id}`}
      ref={ref}
      className={cx(s.button, className, {
        [s.loading]: loading,
        [s.disabled]: disabled,
      })}
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      {loading && <span className={s.loader} />}
      <span className={s.childrenWrapper}>{children}</span>
    </button>
  );
});

export default CustomButton;
