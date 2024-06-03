import React, { useEffect, useId, useState, useRef } from 'react';
import s from './Overlay.module.scss';
import ReactDom from 'react-dom';
import cx from 'classnames';

const Overlay = ({
  isOpen,
  onClose = () => { }
}) => {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(isOpen);
    } else {
      timeoutRef.current = setTimeout(() => {
        if (!isOpen && document.getElementById(`${id}_overlay`)) {
          setVisible(isOpen);
        }
      }, 300);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [isOpen]);


  if (!visible) return false;
  return ReactDom.createPortal(
    <div
      id={`${id}_overlay`}
      key={id}
      className={cx(s.overlay,
        {
          [s.overlayEnabled]: isOpen,
          [s.overlayDisabled]: !isOpen,
        }
      )}
      onClick={onClose}
    />,
    document.body
  )
}

export default Overlay;