import React, { useCallback, useState } from 'react';
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
import { connect, useDispatch } from "react-redux";
import { handleLogout } from 'actions/rootReducer';
import CustomMenu from 'components/CustomMenu/CustomMenu';
import cx from 'classnames';
import Overlay from 'components/Overlay/Overlay';

const mapStateToProps = (state) => ({
  role: state.user.role,
});

const MenuItem = (title, route, icon) => (
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
  const [selectedValue, setSelectedValue] = useState('/');

  const menuItemOnClick = useCallback((value) => {
    if (value === '/login') {
      dispatch(handleLogout())
    }
    setSelectedValue(value);
    navigate(value);
  }, [])

  return (
    <React.Fragment>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <div className={cx(s.root, s.drawer,
        isOpen
          ? s.drawerEnabled
          : s.drawerDisabled
      )}>
        <div className={s.avatarWrapper}>
          <div className={s.img}>
            <img src='/assets/images/whale.png' alt='' />
          </div>
          Test account
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

export default connect(mapStateToProps)(CustomDrawer);