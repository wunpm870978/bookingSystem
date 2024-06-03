import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { BOUNCE, BOUNCEIN, FADEINUP, FADEINDOWN } from './constants';

const AniamtionWrapper = ({
  animation = 'bounce',
  children,
}) => {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const callback = () => {
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setVisible(true);
          }
        });
      }
    }

    const observer = new IntersectionObserver(callback, options);
    containerRef.current && observer.observe(containerRef.current);

    return () => containerRef.current && observer.unobserve(containerRef.current);
  }, [])

  return (
    <div
      ref={containerRef}
      className={cx({
        ['animate__bounce']: animation === BOUNCE && visible,
        ['animate__bounceIn']: animation === BOUNCEIN && visible,
        ['animate__fadeInUp']: animation === FADEINUP && visible,
        ['animate__fadeInDown']: animation === FADEINDOWN && visible,
      })}
    >
      {children}
    </div>
  )
}

export default AniamtionWrapper