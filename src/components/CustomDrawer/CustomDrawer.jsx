import React, { useCallback, useEffect, useState } from 'react';
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
import { handleLogout } from 'actions/reducers/global';
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
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    if (isOpen && !visible) {
      setVisible(true)
    } else if (!isOpen && visible) {
      setTimeout(() => {
        setVisible(false);
      }, 400)
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

export default connect(mapStateToProps)(CustomDrawer);