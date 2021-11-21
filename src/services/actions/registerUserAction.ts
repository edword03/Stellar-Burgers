import { setCookie } from '../../utils/cookie';
import { IRegisterType, IRegisterUser } from '../../types';
import { AppDispatch, AppThunk } from '../types';
import { IUserFailed, IUserRequest, IUserSuccess } from '../types/userRegisterTypes';

export const USER_REQUEST: 'USER_REQUEST' = 'USER_REQUEST';
export const USER_SUCCESS: 'USER_SUCCESS' = 'USER_SUCCESS';
export const USER_FAILED: 'USER_FAILED' = 'USER_FAILED';

export const userRequest = (): IUserRequest => ({
  type: USER_REQUEST
});

export const userSuccess = (data: IRegisterUser): IUserSuccess => ({
  type: USER_SUCCESS,
  payload: data.user
})

export const userError = (): IUserFailed => ({
  type: USER_FAILED,
})

export const registerUser: AppThunk = (body: IRegisterType) => {
  return async(dispatch: AppDispatch) => {
    try {
      dispatch(userRequest());

      const res = await fetch(`${process.env.REACT_APP_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data: IRegisterUser = await res.json()

      if (data.success) {
        dispatch(userSuccess(data))
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }
    } catch (error) {
      dispatch(userError());
      console.error(error);
    }
  };
};
