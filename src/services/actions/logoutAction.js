import { USER_FAILED, USER_REQUEST } from './registerUserAction';
import { removeCookie } from '../../utils/cookie.ts';
export const USER_LOGOUT = 'USER_LOGOUT';

export function logout() {
  return dispatch => {
    dispatch({
      type: USER_REQUEST,
    });

    fetch(`${process.env.REACT_APP_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network error');
      })
      .then(data => {
        if (data.success) {
          dispatch({
            type: USER_LOGOUT,
          });

          removeCookie('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }).catch(err => {
        dispatch({
          type: USER_FAILED
        })
        console.error(err);
      })
  };
}
