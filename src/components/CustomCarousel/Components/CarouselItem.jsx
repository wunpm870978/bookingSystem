import React from 'react';
import cuid from 'cuid';
import cx from 'classnames';
import s from './CarouselItem.module.scss';

const CarouselItem = ({
  key = cuid(),
  children,
  itemCount = 1,
  classname: c = {},
}) => {
  return (
    <div
      key={key}
      className={cx(s.slide, c.slide)}
      style={{
        width: `calc(100% / ${itemCount})`
      }}
    >
      {children}
    </div>
  )
}

CarouselItem.displayName = 'CarouselItem';
export default CarouselItem;