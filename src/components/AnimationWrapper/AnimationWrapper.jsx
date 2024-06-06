import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import s from './AnimationWrapper.module.scss';

const AniamtionWrapper = ({
  animation = 'fadeInUp',
  children,
}) => {
  const containerRef = useRef(null);
  const observer = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const options = {
      threshold: 0.4,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setVisible(true);
          observer.current.unobserve(containerRef.current);
        }
      });
    }

    observer.current = new IntersectionObserver(callback, options);
    containerRef.current && observer.current.observe(containerRef.current);

    return () => {
      if (containerRef.current && observer.current) {
        observer.current.unobserve(containerRef.current);
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cx(s.root, 'animate__animated', {
        [s.hidden]: !visible,
        [`animate__${animation}`]: visible,
      })}
    >
      {children}
    </div>
  )
}

export default AniamtionWrapper;