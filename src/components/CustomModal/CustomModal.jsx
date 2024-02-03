import React, { useState, useEffect, useCallback, isValidElement, useMemo } from 'react';
import s from './CustomModal.scss';
import cx from 'classnames';
import ReactDom from 'react-dom';
import cuid from 'cuid';

const CustomModal = ({
  isOpen = false,
  onClose = (value) => { },
  modalId = useMemo(() => cuid(), []),
  parentRef = null,
  /**
   * slide animation
   * 1) up
   * 2) down
   * 3) left
   * 4) right
   */
  slideAnimation = 'left',
  closeEnabled = true,
  style = {},
  header: Header, // jsx component
  footer: Footer, // jsx component
  children
}) => {
  const [visible, setVisible] = useState(false);

  const getSlidingAnimation = useCallback(() => {
    switch (slideAnimation) {
      case 'up':
        if (isOpen) return s.contentAnimationSlideUpIn
        return s.contentAnimationSlideUpOut
      case 'down':
        if (isOpen) return s.contentAnimationSlideDownIn
        return s.contentAnimationSlideDownOut
      case 'left':
        if (isOpen) return s.contentAnimationSlideLeftIn
        return s.contentAnimationSlideLeftOut
      case 'right':
        if (isOpen) return s.contentAnimationSlideRightIn
        return s.contentAnimationSlideRightOut
      default:
        return;
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    onClose(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      setVisible(isOpen);
    } else {
      setTimeout(() => {
        if (!isOpen && document.getElementById(modalId)) {
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
      if (document.getElementById(modalId)) {
        if (document.getElementById(modalId).parentNode) {
          document.getElementById(modalId).parentNode.removeChild(document.getElementById(modalId));
        }
      }
    }
  }, [])

  if (!visible) return false;
  return ReactDom.createPortal(
    <div className={cx(s.root, parentRef && s.rootWithParent)} id={modalId}>
      <div className={cx(s.mask, isOpen ? s.maskIn : s.maskOut)} onClick={handleClose} />
      <div className={cx(s.content, getSlidingAnimation())} style={style}>
        {closeEnabled &&
          <div className={s.closeContainer}>
            <div className={s.close} onClick={handleClose} />
          </div>
        }
        {isValidElement(Header) && <div className={s.header}>{Header}</div>}
        <div className={s.child}>
          {children}
        </div>
        {isValidElement(Footer) && <div className={s.footer}>{Footer}</div>}
      </div>
    </div>,
    parentRef || document.body
  )
}

export default CustomModal;