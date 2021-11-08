export function setCookie(name: string, value: string | null, options: any = {}) {
  options = {
    path: '/',
    ...options,
  };
  let exp = options.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = options.expires = d;
  }

  if (exp && exp.toUTCString) {
    options.expires = exp.toUTCString();
  }

  if (value) {
    value = encodeURIComponent(value);
  }

  let updatedCookie: string = name + '=' + value;
  for (const propName in options) {
    updatedCookie += '; ' + propName;
    const propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function removeCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
