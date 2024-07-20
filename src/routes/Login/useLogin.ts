import { SyntheticEvent, useState } from "react";
import {
  LOGIN_DEFAULT,
  REGISTER_DEFAULT,
  LOGIN,
  REGISTER,
  LoginObj,
  RegisterObj,
} from "./LoginConstants";
import { useSelector, useDispatch } from "react-redux";
import { passwordEncryption } from "../../utilities/utilities";
import API from "../../services/API";
import { updateUser } from "../../actions/reducers/user";
import isEmpty from "lodash/isEmpty";
import { noti } from "../../components/CustomNotification/Notification";

interface useLoginProps {
  t: any,
  i18n: any
}

const useLogin = ({ t, i18n }: useLoginProps) => {
  const [loginData, setLoginData] = useState<LoginObj>(LOGIN_DEFAULT);
  const [registerData, setRegisterData] = useState<RegisterObj>(REGISTER_DEFAULT);
  const [actionType, setActionType] = useState<string>(LOGIN);
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const dispatch = useDispatch();

  const handleLoginOnChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRegisterOnChange = (field: string, value: string) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLangOnChange = (e: SyntheticEvent<EventTarget>) => {
    if (e !== null && e.target instanceof HTMLElement) {
      i18n.changeLanguage(e.target.dataset.lang)
    }
  }

  const loginOnSubmit = async () => {
    const { username, password } = loginData;
    if (username && password) {
      try {
        const { data } = await API.auth.login({
          username,
          password: passwordEncryption(password)
        })
        dispatch(updateUser(data))
      } catch (err) {
        noti('warning', t('login.login_fail'))
        console.log('loginOnSubmit', err)
      }
    }
  }

  const registerDataValidation = (payload: RegisterObj) => {
    const error = [];
    if (!payload.email || !emailReg.test(payload.email)) error.push('email');
    if (!payload.password) error.push('password');
    return error
  }

  const registerOnSubmit = async () => {
    const error = registerDataValidation(registerData);
    if (!isEmpty(error)) {

    }
    try {
      const response = await API.auth.register(registerData);
      if (response.status === 201) {

      }
    } catch (err) {

    }
  }

  return {
    loginData,
    registerData,
    actionType, setActionType,
    handleLoginOnChange,
    handleRegisterOnChange,
    handleLangOnChange,
    loginOnSubmit,
    registerOnSubmit,
  }
}

export default useLogin;
