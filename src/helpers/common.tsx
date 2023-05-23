import cookie from 'js-cookie';
import { form } from '@/constants';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: form.cookie.expires.days,
      path: '/',
    });
  }
}

export const getCookie = (key: string) => {
  return cookie.get(key);
}

export const getCookieFromServer = (key: string, req: IncomingMessage & { cookies: NextApiRequestCookies }) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key);
  }
}

export const setLocalStorage = (key: string, value: any) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const getLocalStorage = (key: string) => {
  if (process.browser) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(JSON.parse(value)) : null;
  }

  return null;
}

export const removeLocalStorage = (key: string) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
}

export const generateImageUrl = (name: string, type: string) => {
  return `${process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_HOST}:` +
    `${process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_PORT}/${type}/${name}.png`;
}
