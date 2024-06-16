import React, { useEffect, useRef, useState } from 'react';
import s from './CustomNotification.module.scss';
import cx from 'classnames';
import { PropTypes } from 'prop-types';
import { POSITION } from './constants';

const CustomNotification = ({
  position,
  message,
  duration,
  containerNode,
  notiRoot,
}) => {
  const timeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration !== '-') {
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, duration)
    }

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [])

  useEffect(() => {
    if (!visible) {
      closeTimeoutRef.current = setTimeout(() => {
        notiRoot.unmount()
        document.body.removeChild(containerNode);
      }, 400)
    }

    return () => {
      closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current);
    }
  }, [visible])

  return (
    <div
      className={cx(s.root, s[position], {
        [s.fadeInDown]: visible,
        [s.fadeOut]: !visible,
      })}>
      {message}
    </div>
  )
}

CustomNotification.defaultProps = {
  position: POSITION.TOP,
  message: 'hello world',
  duration: 3000,
}
CustomNotification.propTypes = {
  position: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

export default CustomNotification;