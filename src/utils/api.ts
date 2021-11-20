import { IRegisterUser, IResetPass } from '../types';
import { setCookie } from './cookie';

interface IRefreshTokenRes {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}



const checkReponse = (res: Response): Promise<IRegisterUser> => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const refreshToken = async (): Promise<IRefreshTokenRes> => {
  const res = await fetch(`${process.env.REACT_APP_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });

  if (res.ok) {
    return await res.json();
  }

  throw new Error('Network error');
};

export const fetchWithRefresh = async (url: string, options: any): Promise<IRegisterUser> => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken, { expires: 1 });
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const resetPassword = async (body: { email: string }, url = ''): Promise<IResetPass> => {
  console.log(body);
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/password-reset${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('Network error');
  } catch (error: any) {
    console.error(error);
    return error.message
  }

}
