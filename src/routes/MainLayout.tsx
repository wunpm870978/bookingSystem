import React, { FC, useState, ReactNode } from "react";
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import s from './MainLayout.module.scss';
import Navbar from "../components/Navbar/Navbar";

interface MainLayout {
  children: ReactNode
}

const MainLayout: FC<MainLayout> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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

export default MainLayout;