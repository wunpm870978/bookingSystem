import React, {
  useState,
  useEffect,
  useCallback,
  isValidElement,
  useId,
  useRef,
} from 'react';
import s from './CustomModal.module.scss';
import cx from 'classnames';
import ReactDom from 'react-dom';
import Overlay from 'components/Overlay/Overlay';

const CustomModal = ({
  isOpen = false,
  onClose = () => { },
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
  header, // jsx component
  footer, // jsx component
  classname: c = {}, //自訂class 可參考CustomModal.scss改返相關className
  children
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const getAnimation = useCallback(() => {
    const animation = (entry, leave) => {
      return {
        [entry]: isOpen,
        [leave]: !isOpen
      }
    }
    if (c.entry && c.leave) {
      return animation(c.entry, s.leave);
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

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      setVisible(isOpen);
    } else if (!isOpen && visible) {
      timeoutRef.current = setTimeout(() => {
        if (!isOpen && document.getElementById(`${id}_modal`)) {
          setVisible(isOpen);
        }
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }, 300)
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [isOpen])

  useEffect(() => {
    /** 
     * cleanup functions 
     * 1) reset variables
     * 2) allow scroll for body
     * 3) detroy element release resources
     */
    return () => {
      onClose();
      setVisible(false);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (document.getElementById(`${id}_modal`)) {
        if (document.getElementById(`${id}_modal`).parentNode) {
          document.getElementById(`${id}_modal`).parentNode.removeChild(document.getElementById(`${id}_modal`));
        }
      }
    }
  }, [])

  if (!visible) return false;
  return ReactDom.createPortal(
    <div className={cx(s.root, c.root, parentRef && s.rootWithParent)} id={`${id}_modal`}>
      <Overlay isOpen={isOpen} onClose={handleClose} />
      <div className={cx(s.content, c.content, getAnimation())} style={style}>
        {closeEnabled && !Header && <div className={cx(c.closeContainer || s.closeContainer)}>
          <div className={cx(s.close, c.close)} onClick={onClose} />
        </div>}
        <Header closeEnabled={closeEnabled} c={c} onClose={onClose}>{header}</Header>
        <div className={cx(c.child || s.child)}>
          {children}
        </div>
        <Footer c={c}>{footer}</Footer>
      </div>
    </div>,
    parentRef || document.body
  )
}

const Header = ({
  children,
  closeEnabled,
  c,
  onClose
}) => {
  if (!isValidElement(children)) return false;
  return (
    <div className={cx(s.header, c.header)}>
      {children}
      {closeEnabled && <div className={cx(s.close, s.headerClose)} onClick={onClose} />}
    </div>
  )
}

const Footer = ({ children, c }) => {
  if (!isValidElement(children)) return false;
  return <div className={cx(s.footer, c.footer)}>{children}</div>
}


export default CustomModal;