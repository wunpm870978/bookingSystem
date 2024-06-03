import React, { useState } from "react";
import { connect } from "react-redux";
import CustomDrawer from "components/CustomDrawer/CustomDrawer";
import s from './MainLayout.module.scss'
import Navbar from "components/Navbar/Navbar";

const mapStateToProps = (state) => ({
  user: state.user,
});

const MainLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className={s.root}>
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <div className={s.contentWrapper}>
        <Navbar
          drawerOnClick={() => setIsDrawerOpen(prev => !prev)}
        />
        <div className={s.innerContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(MainLayout);