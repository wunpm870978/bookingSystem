import React from "react";
import { useSelector } from "react-redux";
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import s from './Login.module.scss';
import isEmpty from "lodash/isEmpty";
import { Navigate } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import CustomInput from "components/CustomInput/CustomInput";
import useLogin from "./useLogin";
import {
  LOGIN,
  REGISTER,
} from "./LoginConstants";

const LoginPage = ({ t, i18n }) => {
  const {
    user
  } = useSelector((state) => ({
    user: state.user.user
  }))
  const {
    loginData,
    registerData,
    actionType, setActionType,
    handleLoginOnChange,
    handleRegisterOnChange,
    handleLangOnChange,
    loginOnSubmit,
    registerOnSubmit,
  } = useLogin({ t, i18n });


  if (!isEmpty(user)) return <Navigate to="/" replace={true} />
  return (
    <div className={s.root}>
      <div className={s.overlay} />
      <div className={s.mask} />
      <LanguageWrapper t={t} handleLangOnChange={handleLangOnChange} />
      <PromotionText t={t} />
      <div className={s.formContainer}>
        {{
          LOGIN: <React.Fragment>
            <div className={s.logoContainer}>
              <div className={s.logo} />
              <p>Booking</p>
            </div>
            <div className={s.col}>
              <CustomInput
                label={t('email')}
                value={loginData.username}
                onChange={(e) => handleLoginOnChange('username', e.target.value)}
              />
            </div>
            <div className={s.col}>
              <CustomInput
                type='password'
                label={t('password')}
                value={loginData.password}
                onChange={(e) => handleLoginOnChange('password', e.target.value)}
              />
            </div>
            <div className={s.forgetpw}>
              {t('login.forget_password')}
            </div>
            <Button className={s.loginBtn} onClick={loginOnSubmit}>
              {t('login.login')}
            </Button>
            <div className={s.divider} />
            <Button className={s.loginBtn} onClick={() => setActionType(REGISTER)}>
              {t('login.register')}
            </Button>
          </React.Fragment>,
          REGISTER: <React.Fragment>
            <div className={s.row} onClick={() => setActionType(LOGIN)}>
              <LeftOutlined />
              <p>{t('general.back')}</p>
            </div>
            <div className={s.col}>
              <CustomInput
                label={t('email')}
                reg={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                value={loginData.username}
                onChange={(e) => handleLoginOnChange('username', e.target.value)}
              />
            </div>
            <div className={s.col}>
              <CustomInput
                type='password'
                label={t('password')}
                value={loginData.password}
                onChange={(e) => handleLoginOnChange('password', e.target.value)}
              />
            </div>
            <Button className={s.loginBtn} onClick={() => { }}>
              {t('login.create')}
            </Button>
          </React.Fragment>
        }[actionType]}
      </div>
    </div>
  )
}

const LanguageWrapper = ({ handleLangOnChange }) => {
  return (
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
  )
}

const PromotionText = ({ t }) => {
  return (
    <div className={s.descriptionWrapper}>
      <div className={s.title}>
        <h3>{t('login.title_1')}</h3>
        <h3>{t('login.title_2')}</h3>
      </div>
      <p>{t('login.description')}</p>
    </div>
  )
}

export default withTranslation()(LoginPage);

