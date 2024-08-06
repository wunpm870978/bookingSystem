import { SyntheticEvent, useState, useEffect } from "react";
import {
  LOGIN_DEFAULT,
  REGISTER_DEFAULT,
  LOGIN,
  LoginObj,
  RegisterObj,
} from "./LoginConstants";
import { useDispatch } from "react-redux";
import { passwordEncryption } from "../../utilities/utilities";
import API from "../../services/API";
import { login } from "../../actions/reducers/user";
import isEmpty from "lodash/isEmpty";
import { noti } from "../../components/CustomNotification/Notification";
import { ERROR_CODE_MAP, CustomError } from './../../constant';
import { isAxiosError } from 'axios';
import { useNavigate } from "react-router-dom";

const { INVALID_FORMAT } = ERROR_CODE_MAP;

interface useLoginProps {
  t: any,
  i18n: any
}

const useLogin = ({ t, i18n }: useLoginProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginObj>(LOGIN_DEFAULT);
  const [registerData, setRegisterData] = useState<RegisterObj>(REGISTER_DEFAULT);
  const [actionType, setActionType] = useState<string>(LOGIN);
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
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

  const loginOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { username, password } = loginData;
    if (username && password) {
      try {
        const { data } = await API.auth.login({
          username,
          password: passwordEncryption(password)
        });
        dispatch(login(data));
        navigate("/", { replace: true });
      } catch (err) {
        noti('warning', t('login.login_fail'))
        console.log('loginOnSubmit', err)
      } finally {
        setIsLoading(false);
      }
    }
  }

  const registerDataValidation = (payload: RegisterObj) => {
    const error = [];
    if (!payload.email || !emailReg.test(payload.email)) error.push('email');
    if (!payload.password) error.push('password');
    return error
  }

  const registerOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const error = registerDataValidation(registerData);
    try {
      if (!isEmpty(error)) throw INVALID_FORMAT;
      const response = await API.auth.register(registerData);
      if (response.status === 201) {
        dispatch(login(response.data))
        navigate("/verification", { replace: true });
        noti('success', t('login.register_201'));
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        noti('warning', t(`login.register_${err.response.status}`));
      } else {
        const customError = err as unknown as CustomError;
        if (customError.status && customError.message) {
          if (customError.status === 801) {
            noti('warning', t('login.register_err'));
          }
          console.error(customError.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const getUserFromSession = () => {
    const user = sessionStorage.getItem('user');
    const access_token = sessionStorage.getItem('access_token');
    const refresh_token = sessionStorage.getItem('refresh_token');
    if (user && access_token && refresh_token) {
      dispatch(login({
        user: JSON.parse(user),
        access_token,
        refresh_token
      }));
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    getUserFromSession();
  }, [])

  return {
    loginData,
    registerData,
    isLoading,
    actionType, setActionType,
    handleLoginOnChange,
    handleRegisterOnChange,
    handleLangOnChange,
    loginOnSubmit,
    registerOnSubmit,
  }
}

export default useLogin;
