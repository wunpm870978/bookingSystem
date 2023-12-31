import React, { useRef, useLayoutEffect, useState } from 'react';
import s from './CustomModal.scss';
import cx from 'classnames';
import ReactDom from 'react-dom';
import cuid from 'cuid';

const CustomModal = ({
  isOpen = false,
  onClose = (value) => { },
  wrapperId = cuid(),
  children
}) => {
  useLayoutEffect(() => {
    if (!isOpen && document.getElementById(wrapperId)) {
      document.getElementById(wrapperId).parentNode.removeChild(document.getElementById(wrapperId));
    }
    return () => {
      if (document.getElementById(wrapperId)) {
        document.getElementById(wrapperId).parentNode.removeChild(document.getElementById(wrapperId));
      }
    }
  }, [isOpen])

  if (!isOpen) return false;
  return ReactDom.createPortal(
    <div className={s.root} id={wrapperId}>
      <div className={s.mask} onClick={() => onClose(false)} />
      <div className={s.content}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default CustomModal;