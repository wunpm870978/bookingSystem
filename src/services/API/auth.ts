import Instance from './config';
import { RegisterObj } from 'routes/login/LoginConstants';

export default {
  authMe({ username, password }: { username: String; password: string }) {
    return Instance.create({
      method: 'POST',
      url: `/auth/me/`,
      data: { username, password },
    });
  },
  login({ username, password }: { username: String; password: string }) {
    return Instance.create({
      method: 'POST',
      url: `/auth/login/`,
      data: { username, password },
    });
  },
  register(payload: RegisterObj) {
    return Instance.create({
      method: 'POST',
      url: `/auth/register/`,
      data: payload,
    });
  },
  verify(otp: string, email: string, shop_id: string) {
    const params = { otp, email, shop_id };
    return Instance.create({
      method: 'GET',
      url: `/auth/verify-otp/`,
      params,
    });
  },
  resentOtp(email: string, shop_id: string) {
    const params = { email, shop_id };
    return Instance.create({
      method: 'GET',
      url: `/auth/remake-otp/`,
      params,
    });
  },
  logout() {
    return Instance.create({
      method: 'GET',
      url: `/auth/logout/`,
    });
  }
}