import React, { useRef, useLayoutEffect, useState } from 'react'
import s from './CustomPopover.scss';
import _get from 'lodash/get';
import ReactDom from 'react-dom';
import cuid from 'cuid';

const CustomPopover = ({
  targetEleRect = {},
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
      <div
        className={s.content}
        style={{
          left: `${_get(targetEleRect, 'left', 0)}px`,
          top: `${_get(targetEleRect, 'top', 0) + (_get(targetEleRect, 'height') / 2)}px`,
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default CustomPopover;