import Instance from './config';

export default {
  test() {
    return Instance.Create({
      method: 'GET',
      url: '/',
    });
  },
}