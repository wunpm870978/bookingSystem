import React, { useState, useRef, useEffect, useId } from 'react';
import ReactDom from 'react-dom';
import get from 'lodash/get';
import cx from 'classnames';
import s from './Content.module.scss';

const Content = ({
  isOpen = false,
  onClose = () => { },
  position = 'left',
  targetRef,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef(null);
  const timeoutRef = useRef(null);
  const wrapperId = useId();

  const onNotFocus = (e) => {
    if (!contentRef.current.contains(e.relatedTarget)) {
      onClose();
    }
  };

  const getPosition = () => {
    if (targetRef) {
      const rect = targetRef.getBoundingClientRect();
      switch (position) {
        case 'left':
          contentRef.current.style.left = `${get(rect, 'left', 0) - 10}px`;
          contentRef.current.style.top = `${get(rect, 'top', 0) + get(rect, 'height', 0) / 2}px`;
          contentRef.current.style.transform = `translate(-100%, -50%)`;
          break;
        case 'right':
          contentRef.current.style.left = `${get(rect, 'left', 0) + get(rect, 'width', 0) + 10}px`;
          contentRef.current.style.top = `${get(rect, 'top', 0) + get(rect, 'height', 0) / 2}px`;
          contentRef.current.style.transform = `translate(0%, -50%)`;
          break;
        case 'top':
          contentRef.current.style.left = `${get(rect, 'left', 0) + get(rect, 'width', 0) / 2}px`;
          contentRef.current.style.top = `${get(rect, 'top', 0) + 2}px`;
          contentRef.current.style.transform = `translate(-50%, -100%)`;
          break;
        case 'bottom':
          contentRef.current.style.left = `${get(rect, 'left', 0) + get(rect, 'width', 0) / 2}px`;
          contentRef.current.style.top = `${get(rect, 'top', 0) + get(rect, 'height', 0) + 10}px`;
          contentRef.current.style.transform = 'translateX(-50%)';
          break;
        case 'topleft':
          contentRef.current.style.left = `${get(rect, 'right', 0)}px`;
          contentRef.current.style.top = `${get(rect, 'top', 0) + 2}px`;
          contentRef.current.style.transform = 'translate(-100%, -100%)';
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      targetRef && targetRef.addEventListener('mouseout', onNotFocus);
    } else {
      timeoutRef.current = setTimeout(() => {
        if (!isOpen && document.getElementById(wrapperId)) {
          setVisible(isOpen);
          targetRef && targetRef.removeEventListener('mouseout', onNotFocus);
        }
      }, 300);
    }
    return () => {
      targetRef && targetRef.removeEventListener('mouseout', onNotFocus);
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (visible) getPosition();
  }, [visible]);

  if (!visible) return false;
  return ReactDom.createPortal(
    <div
      ref={contentRef}
      className={cx(s.root, s[`root${position}`], {
        [s.entry]: isOpen,
        [s.leave]: !isOpen,
      })}
      onMouseLeave={onClose}
      id={wrapperId}
    >
      <div className={cx(s.content, s[position])}>{children}</div>
    </div>,
    document.body
  );
};

export default Content;