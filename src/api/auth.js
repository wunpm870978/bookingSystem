import API from './index';

export default {
  authMe({ username, password }) {
    return API.API({
      method: 'POST',
      url: `/auth/me/`,
      data: { username, password },
    });
  },
  userLogin({ username, password }) {
    return API.API({
      method: 'POST',
      url: `/auth/login/`,
      data: { username, password },
    });
  }
}