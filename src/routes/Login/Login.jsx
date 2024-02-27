import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { Input, Button, Checkbox } from 'antd';
import s from './Login.module.scss';
import isEmpty from "lodash/isEmpty";
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { passwordEncryption } from "utilities/utilities";
import API from "services/API";
import { updateUser } from "actions/reducers/user";


const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const {
    user
  } = useSelector((state) => ({
    user: state.user.user
  }))
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const handleLoginOnChange = useCallback((field, value) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleLangOnChange = useCallback((e) => {
    i18n.changeLanguage(e.target.dataset.lang)
  }, [i18n])

  const onSubmit = useCallback(async () => {
    const { username, password } = loginData;
    if (username && password) {
      try {
        // const { data } = await API.auth.userLogin({
        //   username,
        //   password: passwordEncryption(password)
        // })
        dispatch(updateUser({ email: username }))
      } catch (err) {

      }
    }
  }, [loginData, dispatch])

  if (!isEmpty(user)) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className={s.root}>
      <div className={s.langWrapper}>
        <div
          className={s.opiton}
          data-lang="zh"
          onClick={handleLangOnChange}
        >
          中文
        </div>
        <div className={s.divider}>
          |
        </div>
        <div
          onClick={handleLangOnChange}
          data-lang="en"
          className={s.opiton}
        >
          Eng
        </div>
      </div>
      <div className={s.inputWrapper}>
        <div>{t('email')}</div>
        <Input
          value={loginData.username}
          onChange={(e) => handleLoginOnChange('username', e.target.value)}
          size="large"
          prefix={<UserOutlined />}

        />
        <div style={{ marginTop: '10px' }}>{t('password')}</div>
        <Input.Password
          value={loginData.password}
          onChange={(e) => handleLoginOnChange('password', e.target.value)}
          size="large"
        />
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <Checkbox
            checked={false}
            onChange={(e) => {
              console.log(e.target.checked)
              // dispatch(handleSaveUsername(e.target.checked))
            }}
          >
            {t('login.save_username')}
          </Checkbox>
          <Checkbox
            checked={false}
            onChange={(e) => {
              console.log(e.target.checked)
              // dispatch(handleSaveUsername(e.target.checked))
            }}
          >

            {t('login.keep_login')}
          </Checkbox>
        </div>
        <Button className={s.loginBtn} onClick={onSubmit}>
          {t('login.login')}
        </Button>
      </div>
    </div>
  )
}

export default LoginPage;

