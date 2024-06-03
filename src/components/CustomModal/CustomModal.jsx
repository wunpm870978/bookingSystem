import React, {
  useState,
  useEffect,
  isValidElement,
  useRef,
  useId,
} from 'react';
import s from './CustomModal.module.scss';
import cx from 'classnames';
import ReactDom from 'react-dom';
import Overlay from '../Overlay/Overlay';

const CustomModal = ({
  isOpen = false,
  onClose = () => { },
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
  header, // jsx component
  footer, // jsx component
  classname: c = {}, //自訂class 可參考CustomModal.scss改返相關className
  children,
}) => {
  const modalId = useId();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const getSlidingAnimation = () => {
    /**
     * 如有自訂動畫
     * 請改名叫 .entry && .leave (入場動畫&離場動畫)
     */
    if (c.entry && c.leave) {
      if (isOpen) return c.entry;
      return c.leave;
    }

    switch (slideAnimation) {
      case 'up':
        if (isOpen) return s.contentAnimationSlideUpIn;
        return s.contentAnimationSlideUpOut;
      case 'down':
        if (isOpen) return s.contentAnimationSlideDownIn;
        return s.contentAnimationSlideDownOut;
      case 'left':
        if (isOpen) return s.contentAnimationSlideLeftIn;
        return s.contentAnimationSlideLeftOut;
      case 'right':
        if (isOpen) return s.contentAnimationSlideRightIn;
        return s.contentAnimationSlideRightOut;
      default:
        return;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      setVisible(isOpen);
    } else {
      timeoutRef.current = setTimeout(() => {
        const modalList = document.querySelectorAll('[id^=cm_]');
        if (modalList.length <= 1) document.documentElement.style.overflow = '';
        if (!isOpen && document.getElementById(modalId)) {
          setVisible(isOpen);
        }
      }, 300);
    }
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      const modalList = document.querySelectorAll('[id^=cm_]');
      if (modalList.length <= 1) document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!visible) return false;
  return ReactDom.createPortal(
    <div
      className={cx(c['root'] || s.root, { [s.rootWithParent]: !!parentRef })}
      id={`cm_${modalId}`}
    >
      <Overlay classname={c['mask']} isOpen={isOpen} onClose={onClose} />
      <div
        className={cx(s.content, c.content, getSlidingAnimation())}
        style={style}
      >
        {closeEnabled && !header && (
          <div className={cx(c.closeContainer || s.closeContainer)}>
            <div className={cx(s.close, c.close)} onClick={onClose} />
          </div>
        )}
        <Header closeEnabled={closeEnabled} c={c} onClose={onClose}>
          {header}
        </Header>
        <div className={cx(c.child || s.child)}>{children}</div>
        <Footer c={c}>{footer}</Footer>
      </div>
    </div>,
    parentRef || document.body
  );
};

const Header = ({ children, closeEnabled, c, onClose }) => {
  if (!isValidElement(children)) return false;
  return (
    <div className={cx(s.header, c.header)}>
      {children}
      {closeEnabled && (
        <div className={cx(s.close, s.headerClose)} onClick={onClose} />
      )}
    </div>
  );
};

const Footer = ({ children, c }) => {
  if (!isValidElement(children)) return false;
  return <div className={cx(s.footer, c.footer)}>{children}</div>;
};

export default CustomModal;