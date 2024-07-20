import {
  FC,
  Children,
  cloneElement,
  useId,
  ReactNode,
} from 'react';
import s from './CustomMenu.module.scss';
import MenuItem, { MenuItemProps } from './Components/MenuItem';
import SubMenu, { SubMenuProps } from './Components/SubMenu';

interface CustomMenuProps {
  selectedValue: string,
  itemOnClick: (value: string) => void,
  children: ReactNode,
}

const CustomMenu: FC<CustomMenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
} = ({ selectedValue, itemOnClick, children }) => {
  const id = useId();
  const childProps = {
    selectedValue,
    itemOnClick,
  }
  return (
    <ul key={`menu_${id}`} className={s.root}>
      {Children.map(children, (child: any) => {
        if (!child || !child.displayName || ![
          "MenuItem",
          "SubMenu"
        ].includes(child.displayName)) return null;
        if (child.displayName === "MenuItem") {
          return cloneElement(child, childProps);
        } else if (child.displayName === "SubMenu") {
          return cloneElement(child, childProps);
        }
      })}
    </ul>
  )
};


CustomMenu.displayName = "Menu";
CustomMenu.Item = MenuItem;
CustomMenu.SubMenu = SubMenu;
export default CustomMenu;