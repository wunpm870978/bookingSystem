import axios from 'axios';
import auth from './auth';
import test from './test';
import { VERSION, SERVER_URL } from 'constant';

class BaseApi {
  constructor() {
    this.requestOptions = {
      withCredentials: true,
      baseURL: SERVER_URL,
      headers: {
        'Access-Control-Allow-Origin': '*',
        // "proxy": {
        //   host: '127.0.0.1',
        //   port: 8030
        // },
        'x-version': VERSION,
        'Content-Type': [
          'text/plain',
          'application/json',
          'multipart/form-data',
          'application/x-www-form-urlencoded'
        ]
      },
      params: {},
      timout: 60000,
    }
    this.init();
  }
  init() {
    this.API = async (props, count = 3) => {
      return await new Promise((resolve, reject) => {
        axios.create(this.requestOptions)(props)
          .then(res => resolve(res))
          .catch((err) => {
            if (count === 0) {
              if (err.response.status === 401) {
                return resolve(this.API(props, count--))
              }
            }
            reject(err)
          })
      })
    }
  }

  auth = auth;
  test = test;
}

export default new BaseApi();
