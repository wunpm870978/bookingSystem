import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, LeftOutlined } from '@ant-design/icons';
import { Input, Button, Checkbox } from 'antd';
import s from './Login.module.scss';
import isEmpty from "lodash/isEmpty";
import { Navigate } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { passwordEncryption } from "utilities/utilities";
import API from "services/API";
import { updateUser } from "actions/reducers/user";


const LoginPage = ({ t, i18n }) => {
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
  const [actionType, setActionType] = useState('LOGIN')

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

  if (!isEmpty(user)) return <Navigate to="/" replace={true} />
  return (
    <div className={s.root}>
      <div className={s.overlay} />
      <div className={s.mask} />
      <div className={s.langWrapper}>
        <div
          className={s.opiton}
          data-lang="zh"
          onClick={handleLangOnChange}
        >
          中文
        </div>
        <div className={s.divider} />
        <div
          onClick={handleLangOnChange}
          data-lang="en"
          className={s.opiton}
        >
          Eng
        </div>
      </div>
      <div className={s.descriptionWrapper}>
        <div className={s.title}>
          <h3>{t('login.title_1')}</h3>
          <h3>{t('login.title_2')}</h3>
        </div>
        <p>{t('login.description')}</p>
      </div>
      <div className={s.formContainer}>
        {{
          LOGIN: <React.Fragment>
            <div className={s.logoContainer}>
              <div className={s.logo} />
              <p>Booking</p>
            </div>
            <div className={s.col}>
              <p>{t('email')}</p>
              <Input
                value={loginData.username}
                onChange={(e) => handleLoginOnChange('username', e.target.value)}
                size="large"
                prefix={<UserOutlined />}

              />
            </div>
            <div className={s.col}>
              <p>{t('password')}</p>
              <Input.Password
                value={loginData.password}
                onChange={(e) => handleLoginOnChange('password', e.target.value)}
                size="large"
              />
            </div>
            <div className={s.forgetpw}>
              forget password
            </div>
            <Button className={s.loginBtn} onClick={onSubmit}>
              {t('login.login')}
            </Button>
            <div className={s.divider} />
            <Button className={s.loginBtn} onClick={() => setActionType('REGISTER')}>
              {t('login.create')}
            </Button>
          </React.Fragment>,
          REGISTER: <React.Fragment>
            <div className={s.row} onClick={() => setActionType("LOGIN")}>
              <LeftOutlined />
              <p>{t('general.back')}</p>
            </div>
            <div className={s.col}>
              <p>{t('email')}</p>
              <Input
                value={loginData.username}
                onChange={(e) => handleLoginOnChange('username', e.target.value)}
                size="large"
                prefix={<UserOutlined />}

              />
            </div>
            <div className={s.col}>
              <p>{t('password')}</p>
              <Input.Password
                value={loginData.password}
                onChange={(e) => handleLoginOnChange('password', e.target.value)}
                size="large"
              />
            </div>
            <Button className={s.loginBtn} onClick={onSubmit}>
              {t('login.register')}
            </Button>
          </React.Fragment>
        }[actionType]}
      </div>
    </div>
  )
}

export default withTranslation()(LoginPage);

