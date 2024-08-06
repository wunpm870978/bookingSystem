import Instance from './config';
import { RegisterObj } from 'routes/login/LoginConstants';

export default {
  authMe({ username, password }: { username: String; password: string }) {
    return Instance.Create({
      method: 'POST',
      url: `/auth/me/`,
      data: { username, password },
    });
  },
  login({ username, password }: { username: String; password: string }) {
    // return new Promise((resolve) => {
    //   resolve({
    //     data: {
    //       email: username
    //     },
    //     status: 200
    //   })
    // })
    return Instance.Create({
      method: 'POST',
      url: `/auth/login/`,
      data: { username, password },
    });
  },
  register(payload: RegisterObj) {
    return Instance.Create({
      method: 'POST',
      url: `/auth/register/`,
      data: payload,
    });
  },
  verify(otp: string, email: string, shop_id: string) {
    const params = { otp, email, shop_id };
    return Instance.Create({
      method: 'GET',
      url: `/auth/verify/`,
      params,
    });
  },
  resentOtp(email: string, shop_id: string) {
    const params = { email, shop_id };
    return Instance.Create({
      method: 'GET',
      url: `/auth/remake/`,
      params,
    });
  }
}