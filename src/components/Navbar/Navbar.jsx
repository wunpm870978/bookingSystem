import React from "react";
import s from './Navbar.module.scss';
import UserButton from "./Components/UserButton.jsx/UserButton";
import cx from 'classnames';

const Navbar = ({
  drawerOnClick = () => { },
}) => {
  return (
    <div className={s.root}>
      <div className={s.menu} onClick={drawerOnClick} />
      <div className={s.user}><UserButton /></div>
    </div>
  )
}

export default Navbar;