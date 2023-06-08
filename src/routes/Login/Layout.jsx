import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { Input, Button, Checkbox } from 'antd';
import s from './Layout.module.scss';
import { isEmpty } from "lodash";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { handleSaveUsername, handleLogin, handleLogout } from 'actions/rootReducer';
import { passwordEncryption, authLoginInfo } from 'actions/auth/auth';

const mapStateToProps = (state) => ({
  user: state.user,
  isSaveUsername: state.isSaveUsername,
  isKeepLogin: state.isKeepLogin,

});

const mapActionToProps = {
  authLoginInfo
}

const LoginPage = ({ user, isSaveUsername, isKeepLogin, authLoginInfo }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isEmpty(user)) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className={s.root}>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: '40px',
          top: '10px',
          lineHeight: 1.5,
          fontSize: '14px',
          justifyContent: 'center'
        }}
      >
        <div
          style={{ userSelect: 'none', cursor: 'pointer' }}
          onClick={() => i18n.changeLanguage('zh')}
        >
          中文
        </div>
        <div style={{ margin: '0px 10px' }}>
          |
        </div>
        <div
          onClick={() => i18n.changeLanguage('en')}
          style={{ userSelect: 'none', cursor: 'pointer' }}
        >
          Eng
        </div>
      </div>
      <div className={s.inputWrapper}>
        <div>
          {t('email')}
        </div>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="large"
          prefix={<UserOutlined />}

        />
        <div style={{ marginTop: '10px' }}>
          {t('password')}
        </div>
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="large"
        />
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <Checkbox
            checked={isSaveUsername}
            onChange={(e) => {
              console.log(e.target.checked)
              dispatch(handleSaveUsername(e.target.checked))
            }}
          >
            {t('login.save_username')}
          </Checkbox>
          <Checkbox
            checked={isKeepLogin}
            onChange={(e) => {
              console.log(e.target.checked)
              // dispatch(handleSaveUsername(e.target.checked))
            }}
          >

            {t('login.keep_login')}
          </Checkbox>
        </div>
        <Button
          className={s.loginBtn}
          onClick={() => {
            console.log(passwordEncryption(password))
            if (!!username && !!password) {
              console.log(username, password)
              authLoginInfo({ username, password })
            }
          }}
        >
          {t('login.login')}
        </Button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapActionToProps)(LoginPage);

