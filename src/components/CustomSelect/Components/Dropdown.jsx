import React, { useEffect, useState, forwardRef, useRef } from 'react';
import s from './Dropdown.module.scss';
import ReactDom from 'react-dom';

const Dropdown = ({ isOpen = false, containerRef, children }) => {
  const dropdownRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const getPosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dropdownRef.current.style.width = rect.width + 'px';
    dropdownRef.current.style.left = rect.left + 'px';
    dropdownRef.current.style.top = rect.bottom + 1 + 'px';
  };

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 200);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [isOpen]);

  useEffect(() => {
    if (visible) {
      getPosition();
    }
  }, [visible]);

  if (!visible) return null;
  return ReactDom.createPortal(
    <ul ref={dropdownRef} className={s.dropdown}>
      {children}
    </ul>,
    document.body
  );
};

Dropdown.displayName = 'Dropdown';
export default Dropdown;