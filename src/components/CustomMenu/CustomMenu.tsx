import {
  FC,
  Children,
  cloneElement,
  useId,
  ReactNode,
  isValidElement,
} from 'react';
import s from './CustomMenu.module.scss';
import MenuItem, { MenuItemProps } from './Components/MenuItem';
import SubMenu, { SubMenuProps } from './Components/SubMenu';

interface CustomMenuProps {
  selectedValue: string,
  itemOnClick: (value: string) => void,
  children: ReactNode,
}

interface CustomMenuComponent extends FC<CustomMenuProps> {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}

const CustomMenu: CustomMenuComponent = ({
  selectedValue,
  itemOnClick,
  children
}: CustomMenuProps): JSX.Element => {
  const id = useId();
  const childProps = {
    selectedValue,
    itemOnClick,
  }
  return (
    <ul key={`menu_${id}`} className={s.root}>
      {Children.map(children, (child: ReactNode) => {
        if (isValidElement<MenuItemProps>(child)) {
          return cloneElement(child, childProps);
        } else if (isValidElement<SubMenuProps>(child)) {
          return cloneElement(child, childProps);
        }
        return null;
      })}
    </ul>
  )
};


CustomMenu.displayName = "Menu";
CustomMenu.Item = MenuItem;
CustomMenu.SubMenu = SubMenu;
export default CustomMenu;