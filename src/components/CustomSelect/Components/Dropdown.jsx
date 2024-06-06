import React, { useEffect, useState, useRef } from 'react';
import s from './Dropdown.module.scss';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Dropdown = ({ isOpen, containerRef, children }) => {
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
    <ul
      ref={dropdownRef}
      className={cx(s.dropdown, 'animate__animated ', {
        'animate__fadeIn': isOpen,
        'animate__fadeOut': !isOpen,
      })}>
      {children}
    </ul>,
    document.body
  );
};

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
  isOpen: PropTypes.bool,
  containerRef: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
}
export default Dropdown;