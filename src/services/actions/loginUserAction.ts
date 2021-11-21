import { setCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk } from '../types';
import { userRequest, userSuccess, userError } from './registerUserAction';

export const loginUser: AppThunk = body => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userRequest());

      const res = await fetch(`${process.env.REACT_APP_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(userSuccess(data));

        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }
    } catch (error) {
      dispatch(userError());
    }
  };
};
