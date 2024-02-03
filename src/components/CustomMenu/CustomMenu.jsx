import React, { cloneElement, useId } from 'react';
import s from './CustomMenu.module.scss';
import MenuItem from './Components/MenuItem/MenuItem';

const CustomMenu = ({
  selectedValue,
  itemOnClick = () => { },
  children
}) => {
  const id = useId();
  return (
    <ul className={s.root}>
      {children.map((child, index) => {
        const displayName = child.type.displayName;
        if (displayName === "MenuItem") {
          return cloneElement(child, {
            id,
            selectedValue,
            itemOnClick,
          });
        } else if (displayName === "MenuDropList") {
          return cloneElement(child, {
            id,
          });
        } else {
          return null;
        }
      })}
    </ul>
  )
}


CustomMenu.displayName = "Menu";
CustomMenu.Item = MenuItem;
export default CustomMenu;