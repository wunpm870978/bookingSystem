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
    <ul key={`${id}_menu`} className={s.root}>
      {children.map((child) => {
        const displayName = child.type.displayName;
        if (displayName === "MenuItem") {
          return cloneElement(child, {
            key: `${id}_menu_option_${child.props.value}`,
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