import React, { useEffect, useRef, useState, FC } from 'react';
import s from './CustomNotification.module.scss';
import cx from 'classnames';
import {
  POSITION,
  MESSAGE_TYPE,
  CustomNotificationProps,
  DURATION,
} from './constants';

const CustomNotification: FC<CustomNotificationProps> = ({
  position = POSITION.TOP,
  messageType = MESSAGE_TYPE.INFO,
  message = '',
  duration = DURATION,
  containerNode,
  notiRoot,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (duration && duration !== -1) {
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
      <Icon messageType={messageType} />
      {message}
    </div>
  )
}

interface IconProps {
  messageType: string
}

const Icon: FC<IconProps> = ({ messageType }) => {
  return <img
    className={s[messageType]}
    src={`/assets/svg/${messageType}.svg`}
    alt=''
  />
}

export default CustomNotification;