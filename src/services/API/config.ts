import { VERSION, SERVER_URL } from '../../constant';
import axios, {
  HeadersDefaults,
  CreateAxiosDefaults,
  RawAxiosRequestHeaders,
  AxiosResponse
} from 'axios';
import cloneDeep from 'lodash/cloneDeep';

interface HeaderObj extends HeadersDefaults {
  'Access-Control-Allow-Origin': string,
  'x-version': string,
  'grant-type'?: string,
  'Content-Type'?: string,
  Authorization?: string,
  common: RawAxiosRequestHeaders,
  delete: RawAxiosRequestHeaders,
  get: RawAxiosRequestHeaders,
  head: RawAxiosRequestHeaders,
  post: RawAxiosRequestHeaders,
  put: RawAxiosRequestHeaders,
  patch: RawAxiosRequestHeaders,
}

interface requestOptionsObj extends CreateAxiosDefaults {
  withCredentials: boolean,
  baseURL: string,
  headers: HeaderObj,
  timeout: number
}

interface reqestOptionProps {
  method: string,
  url: string,
  data?: any,
  params?: Object
}

class Instance {
  requestOptions: requestOptionsObj;

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
        common: {},
        delete: {},
        get: {},
        head: {},
        post: {},
        put: {},
        patch: {},
      },
      timeout: 10000, // milliseconds
    }
  }

  async create(props: reqestOptionProps, count: number = 3): Promise<AxiosResponse> {
    return await new Promise((resolve, reject) => {
      const requestOptions = cloneDeep(this.requestOptions);
      const token = sessionStorage.getItem('access_token');
      if (token) {
        requestOptions.headers['grant-type'] = 'access';
        requestOptions.headers.Authorization = 'Bearer ' + token
      }
      axios.create(requestOptions)(props)
        .then(res => resolve(res))
        .catch(async (err) => {
          if (err.response.status === 498 && count > 0) {
            await this.rertieveToken(cloneDeep(requestOptions), reject);
            return resolve(this.create(props, count--));
          } else {
            reject(err)
          }
        })
    })
  }

  async rertieveToken(requestOptions: requestOptionsObj, reject: (reason?: any) => void) {
    const token = sessionStorage.getItem('refresh_token');
    if (token) {
      requestOptions.headers['grant-type'] = 'refresh';
      requestOptions.headers.Authorization = 'Bearer ' + token
    }
    else return;
    return await axios.create(requestOptions)({
      url: `/auth/me/`,
      method: 'GET',
    })
      .then((res) => {
        const { refresh_token, access_token } = res.data;
        if (refresh_token && access_token) {
          sessionStorage.setItem('refresh_token', refresh_token);
          sessionStorage.setItem('access_token', access_token);
        }
      })
      .catch((err) => {
        // dispatch logout event to clear session and redux state
        const event = new Event('logout')
        document.dispatchEvent(event);
        reject(err);
      })
  }
}

export default new Instance();
