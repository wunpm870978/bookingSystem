import { VERSION, SERVER_URL } from '../../constant';
import axios, { HeadersDefaults, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios';

interface HeaderObj extends HeadersDefaults {
  'Access-Control-Allow-Origin': string,
  'x-version': string,
  'Content-Type': string[],
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
  Create: (props: reqestOptionProps, count?: number) => Promise<any>;

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
        ],
        common: {},
        delete: {},
        get: {},
        head: {},
        post: {},
        put: {},
        patch: {},
      },
      timeout: 60000,
    }

    this.Create = async (props, count = 3) => {
      return await new Promise((resolve, reject) => {
        axios.create(this.requestOptions)(props)
          .then(res => resolve(res))
          .catch((err) => {
            if (count === 0) {
              if (err.response.status === 401) {
                return resolve(this.Create(props, count--))
              }
            }
            reject(err)
          })
      })
    }
  }
}

export default new Instance();
