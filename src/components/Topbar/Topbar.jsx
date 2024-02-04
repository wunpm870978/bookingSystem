import React from "react";
import s from './Topbar.module.scss';

const TopbarLayout = ({
  drawerOnClick = () => { },
}) => {
  return (
    <div className={s.root}>
      <div className={s.menu} onClick={drawerOnClick} />
    </div>
  )
}

export default TopbarLayout