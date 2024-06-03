import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import s from './Dropdown.module.scss';

const Dropdown = ({
  isOpen,
  containerRef,
  children,
  width,
  onClose = () => { },
}) => {
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const onNotFocus = (e) => {
    if (
      !dropdownRef.current.contains(e.target) &&
      !containerRef.contains(e.target)
    ) {
      onClose();
    }
  };

  const getPosition = () => {
    if (containerRef) {
      containerRef.style.position = 'relative';
      const rect = containerRef.getBoundingClientRect();
      if (width === 'fit') {
        dropdownRef.current.style.width = rect.width + 'px';
      }
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      if(rect.top + dropdownRect.height > window.innerHeight){
        dropdownRef.current.style.top = rect.top - dropdownRect.height + 'px';
      }else{
        dropdownRef.current.style.top = rect.bottom + 1 + 'px';
      }
      dropdownRef.current.style.left = rect.left + 'px';
    }
  }

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.addEventListener('mousedown', onNotFocus);
    } else {
      timeoutRef.current = setTimeout(() => {
        if (!isOpen && dropdownRef.current) {
          setVisible(false);
          document.removeEventListener('mousedown', onNotFocus);
        }
      }, 300);
    }
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      document.removeEventListener('mousedown', onNotFocus);
    };
  }, [isOpen])

  useEffect(() => {
    if (visible) getPosition();
  }, [visible, children])

  if (!visible) return null;
  return ReactDom.createPortal(
    <div
      ref={dropdownRef}
      className={s.dropdownWrapper}
    >
      {children}
    </div>,
    document.body
  )
}

export default Dropdown;