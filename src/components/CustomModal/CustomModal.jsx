import React, { useState, useEffect, useCallback, isValidElement } from 'react';
import s from './CustomModal.scss';
import cx from 'classnames';
import ReactDom from 'react-dom';
import Overlay from 'components/Overlay/Overlay';

const CustomModal = ({
  isOpen = false,
  onClose = (value) => { },
  id = useId(),
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

  const getAnimation = useCallback(() => {
    const animation = (enter, quit) => {
      return {
        [enter]: isOpen,
        [quit]: !isOpen
      }
    }

    switch (slideAnimation) {
      case 'up':
        return animation(s.contentSlideUpIn, s.contentSlideUpOut);
      case 'down':
        return animation(s.contentSlideDownIn, s.contentSlideDownOut);
      case 'left':
        return animation(s.contentSlideLeftIn, s.contentSlideLeftOut);
      case 'right':
        return animation(s.contentSlideRightIn, s.contentSlideRightOut);
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
    } else if (visible) {
      setTimeout(() => {
        if (!isOpen && document.getElementById(`${id}_modal`)) {
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
      if (document.getElementById(`${id}_modal`)) {
        if (document.getElementById(`${id}_modal`).parentNode) {
          document.getElementById(`${id}_modal`).parentNode.removeChild(document.getElementById(`${id}_modal`));
        }
      }
    }
  }, [])

  if (!visible) return false;
  return ReactDom.createPortal(
    <div className={cx(s.root, parentRef && s.rootWithParent)} id={`${id}_modal`}>
      <Overlay isOpen={isOpen} onClose={handleClose} />
      <div className={cx(s.content, getAnimation())} style={style}>
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