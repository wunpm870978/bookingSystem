import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import DesktopDrawer from "components/Drawer/Drawer";
import s from './MainLayout.module.scss'
import TopbarLayout from "components/Topbar/Topbar";

const mapStateToProps = (state) => ({
    user: state.user,
});

const MainLayout = ({ children }) => {
    const drawerRef = useRef(null);

    useEffect(() => {

    }, [drawerRef.current])

    return (
        <div className={s.root}>
            <DesktopDrawer drawerRef={drawerRef} />
            <div className={s.contentWrapper}>
                <TopbarLayout />
                <div className={s.innerContent}>
                {children}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(MainLayout);