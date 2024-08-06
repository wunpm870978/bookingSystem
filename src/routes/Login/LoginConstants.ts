
export interface LoginObj {
  username: string,
  password: string
}
export const LOGIN_DEFAULT: LoginObj = {
  username: '',
  password: ''
};
export interface RegisterObj {
  email: string,
  password: string
}
export const REGISTER_DEFAULT: RegisterObj = {
  email: '',
  password: ''
};

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export const API_ERR_CODE = [403, 404, 409]
export const REGISTER_ERR_OBJ = {
  status: 803,
  message: 'invalid format'
}