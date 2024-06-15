import API from './index';

export default {
  test() {
    return API.API({
      method: 'GET',
      url: '/',
    });
  },
}