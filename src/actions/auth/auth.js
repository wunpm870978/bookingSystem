import encryption from 'js-sha512';
import API from 'api/index';
import { noti } from 'utilities/utilities'
import { handleLogin } from 'actions/rootReducer';

export const passwordEncryption = (plaintext) => {
  const hashedFirstLayer = encryption.sha512(plaintext)
  const processedPlaintext = plaintext + hashedFirstLayer

  return encryption.sha512(processedPlaintext)
}

export const authLoginInfo = (payload) => {
  console.log('ppp', payload)
  return (dispatch) => {
    console.log('dispatch', dispatch)
    API.auth.userLogin(payload)
      .then(res => {
        console.log('mlw res', res.data)
        dispatch(handleLogin(res.data))
      })
      .catch(err => {
        console.log('catch err', err)
        noti('warning', 'login.login_fail')
      })
  }
}
