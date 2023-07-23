import axios from 'axios';
import auth from './auth';

class BaseApi {
  constructor() {
    this.requestOptions = {
      withCredentials: true,
      baseURL: 'http://127.0.0.1:8030',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      params: {},
      timout: 60000,
    }
    this.init();
  }
  init() {
    this.API = async (props, count = 1) => {
      return await new Promise((resolve, reject) => {
        axios.create(this.requestOptions)(props)
          .then(res => resolve(res))
          .catch((err) => {
            console.log(err)
            if (count < 3) {
              if (err.response.status === 401) {
                return resolve(this.API(props, count++))
              }
            }
            reject(err)
          })
      })
    }
  }

  auth = auth;
}

export default new BaseApi();
