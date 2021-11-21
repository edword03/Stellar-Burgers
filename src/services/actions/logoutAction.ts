import { userRequest, userError } from './registerUserAction';
import { removeCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk } from '../types';

export const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT';

export interface IUserLogout {
  type: typeof USER_LOGOUT
}

const userLogoutAction = (): IUserLogout => ({
  type: USER_LOGOUT,
})

export const logout: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userRequest());
      const res = await fetch(`${process.env.REACT_APP_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
        }),
      });
      const data = await res.json();

      if (data.success) {
        dispatch(userLogoutAction());

        removeCookie('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      dispatch(userError());
      console.error(error);
    }
  };
};
