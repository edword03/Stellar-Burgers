import { USER_REQUEST, USER_SUCCESS, USER_FAILED } from './registerUserAction';
import { fetchWithRefresh } from '../../utils/api';
import { getCookie } from '../../utils/cookie';

export function getUser(method, option) {
  return  dispatch => {
    dispatch({
      type: USER_REQUEST
    })
    fetchWithRefresh(`${process.env.REACT_APP_URL}/auth/user`, {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken'),
      },
      ...option
    }).then(res => {
      if (res.success) {
        dispatch({
          type: USER_SUCCESS,
          payload: res.user
        })
      }
    }).catch(err => {
      dispatch({
        type: USER_FAILED
      })
      console.error(err)
    })

  };
}
