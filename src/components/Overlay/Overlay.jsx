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
    setVisible(isOpen);
  }, [isOpen])


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