import React, { useState, useEffect, useRef, cloneElement } from 'react';
import s from './CustomCarousel.module.scss';
import CarouselItem from './Components/CarouselItem';
import cx from 'classnames';

/**
 * @property {Element} children
 * @property {Number} threshold distance pulled to change slide
 * @property {Boolean} infinite infinite scroll
 */
const CustomCarousel = ({ children, threshold = 100, infinite = false }) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const initX = useRef(0);
  const initLeft = useRef(0);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isShifting, setIsShifting] = useState(false);
  const allowShift = useRef(true);

  const dragStart = (e) => {
    e.preventDefault();
    initLeft.current = trackRef.current.offsetLeft;
    isDragging.current = true;
    if (e.type == 'touchstart') {
      initX.current = e.touches[0].clientX;
    } else {
      initX.current = e.clientX;
      trackRef.current.onmousemove = dragAction;
      trackRef.current.onmouseup = dragEnd;
      trackRef.current.onmouseleave = dragEnd;
    }
  };

  const dragAction = (e) => {
    if (isDragging.current) {
      let distanceX = 0;
      if (e.type == 'touchmove') {
        distanceX = initX.current - e.touches[0].clientX;
        initX.current = e.touches[0].clientX;
      } else {
        distanceX = initX.current - e.clientX;
        initX.current = e.clientX;
      }
      trackRef.current.style.left =
        trackRef.current.offsetLeft - distanceX + 'px';
    }
  };

  const dragEnd = (e) => {
    const finalLeft = trackRef.current.offsetLeft;
    setIsShifting(true);
    if (
      finalLeft - initLeft.current < -threshold &&
      (infinite || currentIndexRef.current !== children.length - 1)
    ) {
      shiftSlide(1, 'drag');
    } else if (
      finalLeft - initLeft.current > threshold &&
      (infinite || currentIndexRef.current !== 0)
    ) {
      shiftSlide(-1, 'drag');
    } else {
      trackRef.current.style.left = initLeft.current + 'px';
    }
    isDragging.current = false;
    trackRef.current.onmouseup = null;
    trackRef.current.onmousemove = null;
    trackRef.current.onmouseleave = null;
  };

  const shiftSlide = (dir, action) => {
    if (allowShift.current) {
      if (!action) initLeft.current = trackRef.current.offsetLeft;

      if (dir == 1) {
        trackRef.current.style.left =
          initLeft.current - trackRef.current.children[0].offsetWidth + 'px';
        currentIndexRef.current += 1;
      } else if (dir == -1) {
        trackRef.current.style.left =
          initLeft.current + trackRef.current.children[0].offsetWidth + 'px';
        currentIndexRef.current -= 1;
      }
    }
    allowShift.current = false;
  };

  const checkIndex = () => {
    setIsShifting(false);
    if (currentIndexRef.current < 0) {
      trackRef.current.style.left =
        -(children.length * trackRef.current.children[0].offsetWidth) + 'px';
      currentIndexRef.current = children.length - 1;
    }

    if (currentIndexRef.current === children.length) {
      trackRef.current.style.left =
        -(1 * trackRef.current.children[0].offsetWidth) + 'px';
      currentIndexRef.current = 0;
    }
    setCurrentIndex(currentIndexRef.current + 1);
    allowShift.current = true;
  };

  useEffect(() => {
    const slides = trackRef.current.children;
    const numberOfSlides = slides.length;
    for (let i = 0; i < numberOfSlides; i++) {
      slides[i].style.width = rootRef.current.offsetWidth;
      slides[i].style.flex = `0 0 ${rootRef.current.offsetWidth}`;
    }
    if (infinite) {
      const firstSlide = slides[0];
      const lastSlide = slides[children.length - 1];
      const cloneFirst = firstSlide.cloneNode(true);
      const cloneLast = lastSlide.cloneNode(true);
      trackRef.current.appendChild(cloneFirst);
      trackRef.current.insertBefore(cloneLast, firstSlide);
    }
    trackRef.current.addEventListener('transitionend', checkIndex);
    return () => {
      trackRef.current.removeEventListener('transitionend', checkIndex);
    }
  }, [])

  useEffect(() => {
    /**
     * 計算每個slide嘅width
     * track width = container width / total number of slides
     */
    const slides = trackRef.current.children;
    const numberOfSlides = slides.length;

    trackRef.current.style.width = `${rootRef.current.offsetWidth * numberOfSlides}px`;
    trackRef.current.style.left = `${infinite
      ? -1 * rootRef.current.offsetWidth
      : 0
      }px`;
  }, [children]);

  return (
    <div ref={rootRef} className={s.root}>
      <div
        ref={trackRef}
        className={cx(s.track, { [s.shifting]: isShifting })}
        onTouchStart={dragStart}
        onTouchEnd={dragEnd}
        onTouchMove={dragAction}
        onMouseDown={dragStart}
      >
        {children.map((child) => {
          const displayName = child.type.displayName;
          if (displayName === 'CarouselItem') {
            return cloneElement(child, {
              itemCount: children.length,
            });
          }
          return null;
        })}
      </div>
      <div className={s.pagination}>
        {currentIndex}/{children.length}
      </div>
      {/* <div>
        <a id="prev" className={cx(s.control, s.prev)} onClick={() => shiftSlide(-1)}></a>
        <a id="next" className={cx(s.control, s.next)} onClick={() => shiftSlide(1)}></a>
      </div> */}
    </div>
  );
};

CustomCarousel.displayName = 'Carousel';
CustomCarousel.Item = CarouselItem;
export default CustomCarousel;