import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import CustomDrawer from "components/CustomDrawer/CustomDrawer";
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
      <CustomDrawer />
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