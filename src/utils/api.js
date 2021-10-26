import { setCookie } from './cookie';
const checkReponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const refreshToken = async () => {
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

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken, {expires: 1});
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export async function resetPassword(body, url = '') {
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
  } catch (error) {
    console.error(error);
  }
}
