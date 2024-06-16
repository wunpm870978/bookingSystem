import API from './index';

export default {
  authMe({ username, password }) {
    return API.API({
      method: 'POST',
      url: `/auth/me/`,
      data: { username, password },
    });
  },
  login({ username, password }) {
    // return new Promise((resolve) => {
    //   resolve({
    //     data: {
    //       email: username
    //     },
    //     status: 200
    //   })
    // })
    return API.API({
      method: 'POST',
      url: `/auth/login/`,
      data: { username, password },
    });
  },
  register(payload) {
    return API.API({
      method: 'POST',
      url: `/auth/register/`,
      data: payload,
    });
  },
}