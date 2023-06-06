import { AxiosError, AxiosResponse } from 'axios';
import { UnauthorizedError } from '@/errors';

export const responseInterceptor = <T>(response: AxiosResponse<T>) => {
  return {
    ...response,
    ...(response.data && { data: response.data }),
  };
};

export const errorInterceptor = (err: AxiosError): Promise<never> => {
  const { response } = err;

  if (response) {
    const { status, statusText } = response;

    if (status === 401 && statusText === 'Unauthorized') {
      window.location.href = '/login';
    }
  } else {
    throw new Error('Error Interceptor: No response');
  }

  return Promise.reject(err);
};
