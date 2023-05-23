import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { methods } from '@/constants/enums';
import { getCookie } from '@/helpers/common';
import { errorInterceptor, responseInterceptor } from './interceptors';

const instance = axios.create();
instance.interceptors.response.use(responseInterceptor, errorInterceptor);

const apiCall = (
  method: Method,
  endpointUrl = '',
  data: Record<string, any> = {},
  options?: AxiosRequestConfig,
  overrideBaseUrl?: string,
): AxiosPromise => {
  const API_URL = `${process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_HOST}:` +
    `${process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_PORT}`;

  const accessToken = getCookie('accessToken');

  const config: AxiosRequestConfig = {
    ...options,
    baseURL: overrideBaseUrl || API_URL,
    method,
    url: endpointUrl,
    headers: {
      ...(options && options.headers ? options.headers : {}),
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  const payload = {
    ...data,
  } as Record<string, any>;

  if (method === methods.GET) {
    Object.keys(payload).forEach((key) => {
      if (payload[key] === null || payload[key] === '') {
        delete payload[key];
      }
    });
    config.params = payload;
  } else {
    config.data = payload;
  }

  return instance.request(config);
};

export default apiCall;
