import React, { useState, memo } from 'react';
import { useSelector } from "react-redux";
import s from './UserButton.module.scss';
import CustomPopover from 'components/CustomPopover/CustomPopover';

const UserButton = () => {
  const {
    userName
  } = useSelector((state) => ({
    userName: state.user.user.name
  }))
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <CustomPopover
      isOpen={isDropdownOpen}
      position='bottomleft'
      onClose={() => {
        console.log('mlw close')
        setIsDropdownOpen(false)
      }}
      content={(
        <div>
          <div>Logout</div>
        </div>
      )}
    >
      <div
        className={s.root}
        onClick={() => setIsDropdownOpen(true)}
      >
        <p>{userName}</p>
        <div className={s.down} />
      </div>
    </CustomPopover>
  )
}

export default memo(UserButton);