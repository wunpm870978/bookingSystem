import React, { useCallback, useEffect, useState, useRef, useId } from 'react';
import ReactDom from 'react-dom';
import Overlay from 'components/Overlay/Overlay';
import cx from 'classnames';
import s from './PopoverContent.module.scss';
import get from 'lodash/get';

const PopoverContent = ({
  isOpen = false,
  onClose = () => { },
  position = 'left',
  maskEnabled = true,
  targetRef,
  children
}) => {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const contentRef = useRef(null);
  const timeoutRef = useRef(null);

  const onNotFocus = useCallback((e) => {
    if (
      targetRef.contains(e.target) ||
      !contentRef.current.contains(e.target)
    ) {
      onClose();
    }
  }, [targetRef]);

  const getPosition = useCallback((isReturnEmpty) => {
    if (isReturnEmpty) return {};
    if (targetRef) {
      const rect = targetRef.getBoundingClientRect();
      switch (position) {
        case 'left':
          return {
            left: `${get(rect, 'left', 0) - 10}px`,
            top: `${get(rect, 'top', 0) + (get(rect, 'height', 0) / 2)}px`,
            transform: `translate(-100%, -50%)`
          }
        case 'right':
          return {
            left: `${get(rect, 'left', 0) + get(rect, 'width', 0) + 10}px`,
            top: `${get(rect, 'top', 0) + (get(rect, 'height', 0) / 2)}px`,
            transform: `translate(0%, -50%)`
          }
        case 'top':
          return {
            left: `${get(rect, 'left', 0) + (get(rect, 'width', 0) / 2)}px`,
            top: `${get(rect, 'top', 0) - 10}px`,
            transform: 'translate(-50%, -100%)',
          }
        case 'bottom':
          return {
            left: `${get(rect, 'left', 0) + (get(rect, 'width', 0) / 2)}px`,
            top: `${get(rect, 'top', 0) + get(rect, 'height', 0) + 10}px`,
            transform: 'translateX(-50%)',
          }
        case 'topleft':
          return {
            left: `${get(rect, 'right', 0)}px`,
            top: `${get(rect, 'top', 0) - 10}px`,
            transform: 'translate(-100%, -100%)',
          }
        case 'bottomleft':
          return {
            left: `${get(rect, 'right', 0)}px`,
            top: `${get(rect, 'top', 0) + get(rect, 'height', 0) + 10}px`,
            transform: 'translateX(-100%)',
          }
        default:
          return {};
      }
    }
    return {};
  }, [position, targetRef])

  useEffect(() => {
    if (isOpen) {
      setVisible(isOpen);
      document.addEventListener("mousedown", onNotFocus);
    } else if (!isOpen && visible) {
      timeoutRef.current = setTimeout(() => {
        if (!isOpen && document.getElementById(`${id}_po`)) {
          setVisible(isOpen);
          document.removeEventListener("mousedown", onNotFocus);
        }
      }, 300)
    }
    return () => {
      window.removeEventListener("mousedown", onNotFocus);
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [isOpen])

  if (!visible) return false;
  return ReactDom.createPortal(
    <div
      className={cx(s.root, { [s.rootRelative]: !maskEnabled })}
      id={`${id}_po`}
      style={getPosition(maskEnabled)}
    >
      {maskEnabled && <Overlay isOpen={isOpen} onClose={onClose} />}
      <div
        ref={contentRef}
        className={cx(s.content, {
          [s.entry]: isOpen,
          [s.leave]: !isOpen,
          [s.relative]: !maskEnabled,
        })}
        style={getPosition(!maskEnabled)}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default PopoverContent;