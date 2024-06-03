import React, { useRef, Children, cloneElement, useEffect } from 'react';
import s from './CustomToggle.module.scss';
import Option from './Components/Option';

const CustomToggle = ({ children, value, onChange }) => {
  const containerRef = useRef(null);
  const togglerRef = useRef(null);
  const optionsList = useRef([]);

  useEffect(() => {
    const selected = optionsList.current.find(
      ({ ref, props }) => props.value === value
    );
    if (selected) {
      togglerRef.current.style.width =
        selected.ref.getBoundingClientRect().width + 'px';
      togglerRef.current.style.left =
        Math.abs(
          containerRef.current.getBoundingClientRect().left -
            selected.ref.getBoundingClientRect().left
        ) +
        3 +
        'px';
    }
  }, [value]);

  return (
    <div className={s.toggleWrapper}>
      <div ref={togglerRef} className={s.toggler} />
      <ul ref={containerRef} className={s.optionWrapper}>
        {Children.map(children, (child, index) => {
          const displayName = child.type.displayName;
          if (displayName === 'ToggleOption') {
            return cloneElement(child, {
              ref: (ref) =>
                (optionsList.current[index] = { ref, props: child.props }),
              selectedValue: value,
              onChange,
            });
          }
          return null;
        })}
      </ul>
    </div>
  );
};

CustomToggle.displayName = 'Toggle';
CustomToggle.Option = Option;
export default CustomToggle;