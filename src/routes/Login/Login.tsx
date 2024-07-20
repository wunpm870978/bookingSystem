import { Fragment, FC, ChangeEvent, MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import s from './Login.module.scss';
import isEmpty from "lodash/isEmpty";
import { Navigate } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import CustomInput from "../../components/CustomInput/CustomInput";
import useLogin from "./useLogin";
import {
  LOGIN,
  REGISTER,
} from "./LoginConstants";
import { RootState } from "../../actions/store";

interface LoginPageProps {
  t: any,
  i18n: any
}

const LoginPage: FC<LoginPageProps> = ({ t, i18n }) => {
  const {
    user
  } = useSelector((state: RootState) => ({
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
      <LanguageWrapper handleLangOnChange={handleLangOnChange} />
      <PromotionText t={t} />
      <div className={s.formContainer}>
        {{
          LOGIN: <Fragment>
            <div className={s.logoContainer}>
              <div className={s.logo} />
              <p>Booking</p>
            </div>
            <div className={s.col}>
              <CustomInput
                outline
                label={t('email')}
                value={loginData.username}
                onChange={(e) => handleLoginOnChange('username', (e.target as HTMLTextAreaElement).value)}
              />
            </div>
            <div className={s.col}>
              <CustomInput
                outline
                type='password'
                label={t('password')}
                value={loginData.password}
                onChange={(e) => handleLoginOnChange('password', (e.target as HTMLTextAreaElement).value)}
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
          </Fragment>,
          REGISTER: <Fragment>
            <div className={s.row} onClick={() => setActionType(LOGIN)}>
              <LeftOutlined />
              <p>{t('general.back')}</p>
            </div>
            <div className={s.col}>
              <CustomInput
                outline
                label={t('email')}
                reg={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                value={loginData.username}
                onChange={(e) => handleLoginOnChange('username', (e.target as HTMLTextAreaElement).value)}
              />
            </div>
            <div className={s.col}>
              <CustomInput
                outline
                type='password'
                label={t('password')}
                value={loginData.password}
                onChange={(e) => handleLoginOnChange('password', (e.target as HTMLTextAreaElement).value)}
              />
            </div>
            <Button className={s.loginBtn} onClick={() => { }}>
              {t('login.create')}
            </Button>
          </Fragment>
        }[actionType]}
      </div>
    </div>
  )
}


const LanguageWrapper = ({ handleLangOnChange }: {
  handleLangOnChange: MouseEventHandler
}) => {
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

interface PromotionTextProps {
  t: any
}

const PromotionText: FC<PromotionTextProps> = ({ t }) => {
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

