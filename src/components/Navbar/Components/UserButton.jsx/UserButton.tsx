import React, { FC, useState, memo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import s from './UserButton.module.scss';
import CustomPopover from 'components/CustomPopover/CustomPopover';
import { logout } from 'actions/reducers/user';
import { LogoutOutlined } from '@ant-design/icons';
import { RootState, AppDispatch } from 'actions/store';
import get from 'lodash/get';

const UserButton: FC = () => {
  const user = useSelector((state: RootState) => ({
    userName: state.user.user
  }))
  const dispatch = useDispatch<AppDispatch>()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <CustomPopover
      isOpen={isDropdownOpen}
      position='bottomleft'
      onClose={() => setIsDropdownOpen(false)}
      content={(
        <ul className={s.content}>
          <li onClick={() => dispatch(logout())}>
            <LogoutOutlined />
            <p>Logout</p>
          </li>
        </ul>
      )}
    >
      <div
        className={s.root}
        onClick={() => setIsDropdownOpen(true)}
      >
        <p>{get(user, 'name')}</p>
        <div className={s.down} />
      </div>
    </CustomPopover>
  )
}

export default memo(UserButton);