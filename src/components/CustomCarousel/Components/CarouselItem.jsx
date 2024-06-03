import React, { useId } from 'react';
import cx from 'classnames';
import s from './CarouselItem.module.scss';

const CarouselItem = ({
  children,
  itemCount = 1,
  classname: c = {},
}) => {
  const key = useId();

  return (
    <div
      key={key}
      className={cx(s.slide, c.slide)}
      style={{ width: `calc(100% / ${itemCount})` }}
    >
      {children}
    </div>
  )
}

CarouselItem.displayName = 'CarouselItem';
export default CarouselItem;