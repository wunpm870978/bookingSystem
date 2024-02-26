import React, { cloneElement, useId } from 'react';
import s from './CustomMenu.module.scss';
import MenuItem from './Components/MenuItem';
import SubMenu from './Components/SubMenu';

const CustomMenu = ({
  selectedValue,
  itemOnClick = () => { },
  children
}) => {
  const id = useId();
  const childProps = {
    selectedValue,
    itemOnClick,
  }
  return (
    <ul key={`${id}_menu`} className={s.root}>
      {React.Children.map(children, (child) => {
        const displayName = child.type.displayName;
        if (displayName === "MenuItem") {
          return cloneElement(child, childProps);
        } else if (displayName === "SubMenu") {
          return cloneElement(child, childProps);
        } else {
          return null;
        }
      })}
    </ul>
  )
}


CustomMenu.displayName = "Menu";
CustomMenu.Item = MenuItem;
CustomMenu.SubMenu = SubMenu;
export default CustomMenu;