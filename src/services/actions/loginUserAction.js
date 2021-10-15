import { setCookie } from '../../utils/cookie';
import { USER_REQUEST, USER_SUCCESS, USER_FAILED } from './registerUserAction';

export function loginUser(body) {
  return dispatch => {
    dispatch({
      type: USER_REQUEST
    });

    fetch(`${process.env.REACT_APP_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error');
      })
      .then(data => {
        if (data.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: data.user,
          });

          setCookie('accessToken', data.accessToken,)
          localStorage.setItem('refreshToken', data.refreshToken, {expires: 1000})
        }
      }).catch(err => {
        dispatch({
          type: USER_FAILED
        })
        console.error(err)
      })
  };
}
