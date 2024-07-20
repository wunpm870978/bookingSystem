import React, { useCallback, useEffect, useState, useRef, ReactNode } from 'react';
import s from './CustomDrawer.module.scss';
import {
  MailOutlined,
  UserOutlined,
  ShopOutlined,
  CalendarOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  LineChartOutlined,
  ScheduleOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../../actions/reducers/user';
import CustomMenu from '../CustomMenu/CustomMenu';
import cx from 'classnames';
import Overlay from '../Overlay/Overlay';

const MenuItem = (
  title: string,
  route: string,
  icon: ReactNode
) => (
  <CustomMenu.Item
    icon={icon}
    value={route}
  >
    {title}
  </CustomMenu.Item>
)

const CustomDrawer = ({
  isOpen = false,
  onClose = () => { },
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('/');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const menuItemOnClick = useCallback((value: string) => {
    if (value === '/login') {
      // dispatch(handleLogout())
    }
    setSelectedValue(value);
    navigate(value);
  }, [])

  useEffect(() => {
    if (isOpen && !visible) {
      setVisible(true)
    } else if (!isOpen && visible) {
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 400)
    }

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [isOpen])

  return (
    <React.Fragment>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <div className={cx(s.root, s.drawer,
        {
          [s.drawerEnabled]: isOpen,
          [s.drawerDisabled]: !isOpen && visible,
        }
      )}>
        <div className={s.avatarWrapper}>
          <div className={s.img}>
            <img src='/assets/images/whale.png' alt='' />
          </div>
          Test account
          <div className={s.close} onClick={onClose} />
        </div>
        <CustomMenu
          selectedValue={selectedValue}
          itemOnClick={menuItemOnClick}
        >
          {MenuItem('Home', '/', <HomeOutlined />)}
          {MenuItem('Profolio', '/profile', <UserOutlined />)}
          {MenuItem('Shop', '/shop', <ShopOutlined />)}
          {MenuItem('Staff', '/staff', <ShopOutlined />)}
          {MenuItem('Course', '/course', <ReadOutlined />)}
          {MenuItem('Calendar', '3.5', <ScheduleOutlined />)}
          {MenuItem('Statistic', '/statistic', <LineChartOutlined />)}
        </CustomMenu>
      </div>
    </React.Fragment>
  )
}

export default CustomDrawer;