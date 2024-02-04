import React, { useEffect, useId, useState } from 'react';
import s from './Overlay.module.scss';
import ReactDom from 'react-dom';
import cx from 'classnames';

const Overlay = ({
  isOpen,
  onClose = () => { }
}) => {
  const id = useId();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      setVisible(isOpen);
    } else if (visible) {
      setTimeout(() => {
        if (!isOpen && document.getElementById(`${id}_overlay`)) {
          setVisible(isOpen);
        }
        document.documentElement.style.overflow = "auto";
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    /** 
     * cleanup functions 
     * 1) reset variables
     * 2) allow scroll for body
     * 3) detroy element release resources
     */
    return () => {
      onClose(false);
      setVisible(false);
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      if (document.getElementById(`${id}_overlay`)) {
        if (document.getElementById(`${id}_overlay`).parentNode) {
          document.getElementById(`${id}_overlay`).parentNode.removeChild(document.getElementById(`${id}_overlay`));
        }
      }
    }
  }, [])

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