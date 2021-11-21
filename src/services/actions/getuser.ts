import { userRequest, userSuccess, userError } from './registerUserAction';
import { fetchWithRefresh } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk } from '../types';

export const getUser: AppThunk = (method: 'GET' | 'PATCH', option: any) => {
  return async(dispatch: AppDispatch) => {
    try {
      dispatch(userRequest())
      const res = await fetchWithRefresh(`${process.env.REACT_APP_URL}/auth/user`, {
        method: method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: getCookie('accessToken'),
        },
        ...option
      })

      if (res.success) {
        dispatch(userSuccess(res))
      }
    } catch (error) {
      dispatch(userError())
      console.error(error)
    }
  };
}
