import { setCookie } from '../../utils/cookie';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'REGISTER_SUCCESS';
export const USER_FAILED = 'REGISTER_FAILED';

export const registerUser = body => {
  return dispatch => {
    dispatch({
      type: USER_REQUEST,
    });

    fetch(`${process.env.REACT_APP_URL}/auth/register`, {
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

        throw new Error('Error registration');
      })
      .then(data => {
        if (data.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: data,
          });
          setCookie('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
        }
      })
      .catch(err => {
        dispatch({
          type: USER_FAILED,
        });
        console.error(err);
      });
  };
};
