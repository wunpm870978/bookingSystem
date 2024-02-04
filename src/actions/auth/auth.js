import encryption from 'js-sha512';
import API from 'api/index';
import { noti } from 'utilities/utilities'
import { handleLogin } from 'actions/rootReducer';

export const authLoginInfo = (payload) => {
  console.log('ppp', payload)
  return (dispatch) => {
    console.log('dispatch', dispatch)
    dispatch(handleLogin({ data: { ...payload } }))
    return
    API.auth.userLogin(payload)
      .then(res => {
        console.log('mlw res', res.data)
        dispatch(handleLogin(res))
      })
      .catch(err => {
        console.log('catch err', err)
        noti('warning', 'login.login_fail')
      })
  }
}
