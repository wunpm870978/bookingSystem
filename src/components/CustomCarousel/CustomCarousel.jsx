import React, { useState, useEffect, useRef, useCallback, cloneElement } from 'react';
import s from './CustomCarousel.module.scss';
import CarouselItem from './Components/CarouselItem';

const CustomCarousel = ({
  children,
  threshold = 100,
}) => {
  const rootRef = useRef(null);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const initX = useRef(0);
  const initLeft = useRef(0);
  const lastTouch = useRef(0);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalLength, setTotalLength] = useState(children.length);

  const resetParams = useCallback(() => {
    initX.current = 0;
    initLeft.current = 0;
    isDragging.current = false;
    sliderRef.current.onmousemove = null;
    sliderRef.current.onmouseup = null;
    sliderRef.current.onmouseleave = null;
  }, [])

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    initX.current = e.clientX;
    initLeft.current = sliderRef.current.offsetLeft;
    isDragging.current = true;
    sliderRef.current.onmousemove = handleActionMove;
    sliderRef.current.onmouseup = handleMouseUp;
    sliderRef.current.onmouseleave = handleMouseUp;
  }, [totalLength])

  const handleMouseUp = useCallback((e) => {
    e.preventDefault();
    console.log('mlw children.length', children, children.length, children.length === 1)
    if (totalLength === 1) return resetParams();
    const distanceX = e.clientX - initX.current;
    handleActionEnd(distanceX);
  }, [totalLength])

  const handleTouchStart = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    initX.current = e.touches[0].clientX;
    initLeft.current = sliderRef.current.offsetLeft;
    isDragging.current = true;
  }, [])

  const handleTouchMove = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    lastTouch.current = e.touches[0].clientX;
    handleActionMove(e.touches[0].clientX);
  }, [])

  const handleTouchEnd = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    if (totalLength === 1) return resetParams();
    const distanceX = lastTouch.current - initX.current;
    handleActionEnd(distanceX);
  }, [totalLength])

  const handleActionMove = useCallback((currentX) => {
    if (isDragging.current) {
      let distanceX = currentX - initX.current;
      const direction = Math.sign(distanceX);
      if (currentIndexRef.current === 0 && direction > 0 && distanceX > threshold) distanceX = threshold;
      else if (currentIndexRef.current === children.length - 1 && direction < 0 && distanceX < -threshold) distanceX = -threshold;
      sliderRef.current.style.left = `${initLeft.current + distanceX}px`;
    }
  }, [])

  const handleActionEnd = useCallback((distanceX) => {
    const direction = Math.sign(distanceX);
    if (
      Math.abs(distanceX) < threshold ||
      currentIndexRef.current === 0 && direction > 0 ||
      currentIndexRef.current === children.length - 1 && direction < 0
    ) {
      sliderRef.current.style.left = `${rootRef.current.offsetWidth * -(currentIndexRef.current)}px`;
    } else {
      sliderRef.current.style.left =
        currentIndexRef.current === 0
          ? `${rootRef.current.offsetWidth * ((currentIndexRef.current) + direction)}px`
          : `${rootRef.current.offsetWidth * (-currentIndexRef.current + direction)}px`;
      currentIndexRef.current = currentIndexRef.current - direction;
      setCurrentIndex(currentIndexRef.current + 1)
    }
    resetParams();
  }, [children])

  useEffect(() => {
    if (rootRef.current && sliderRef.current) {
      sliderRef.current.style.width = `${rootRef.current.offsetWidth * children.length}px`;
    }
    setTotalLength(children.length);
  }, [children])

  return (
    <div
      ref={rootRef}
      className={s.root}
    >
      <div
        ref={sliderRef}
        className={s.sliderWrapper}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children.map((child) => {
          const displayName = child.type.displayName;
          if (displayName === 'CarouselItem') {
            return cloneElement(child, {
              itemCount: children.length
            })
          }
          return null;
        })}
      </div>
      <div className={s.pagination}>
        {currentIndex}/{totalLength}
      </div>
    </div>
  )
}

CustomCarousel.displayName = "Carousel";
CustomCarousel.Item = CarouselItem;
export default CustomCarousel;