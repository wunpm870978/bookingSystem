import React, { useState } from "react";
import { Menu, ConfigProvider } from 'antd';
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
import s from './Drawer.module.scss';
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { handleLogout } from 'actions/rootReducer';

const ROOT_SUBMENU_KEYS = ['sub1', 'sub2'];
const mapStateToProps = (state) => ({
    role: state.user.email,
});

const DesktopDrawer = ({ role, drawerRef }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);

    const subMenuOnOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (ROOT_SUBMENU_KEYS.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const menuOnClick = (e) => {
        console.log('e', e)
        if (e.key === '/login') {
            dispatch(handleLogout())
        }
        navigate(e.key);
    }
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('Home', '/', <HomeOutlined />),
        role !== 'shop' && getItem('Profolio', '/profile', <UserOutlined />),
        role === 'shop' && getItem('Shop', '/shop', <ShopOutlined />),
        getItem('Course', '/course', <ReadOutlined />),
        getItem('Calendar', '/schedule', <CalendarOutlined />),
        getItem('Calendar', '3.5', <ScheduleOutlined />),
        role === 'shop' && getItem('Statistic', '4', <LineChartOutlined />),
        // getItem('Navigation One', 'sub1', <MailOutlined />, [
        //     getItem('Option 5', '5'),
        //     getItem('Option 6', '6'),
        //     getItem('Option 7', '7'),
        //     getItem('Option 8', '8'),
        // ]),
        // getItem('Setting', 'sub2', <SettingOutlined />, [
        //     getItem('Option 9', '9'),
        //     getItem('Option 10', '10'),
        //     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
        // ]),
        getItem('Logout', '/login', <LogoutOutlined />),
    ];
    return (
        <div className={s.DrawerWrapper} ref={drawerRef}>
            <div style={{ display: 'flex', padding: '20px 10px' }}>
                <div style={{ width: '50px', height: '50px', background: 'white' }} />
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 16,
                        // colorPrimary: 'rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                <Menu
                    // style={{ height: '100%' }}
                    defaultSelectedKeys={['0']}
                    openKeys={openKeys}
                    onOpenChange={subMenuOnOpenChange}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={menuOnClick}
                />
            </ConfigProvider>
        </div>
    )
}

export default connect(mapStateToProps)(DesktopDrawer);