import { AxiosError, AxiosResponse } from 'axios';
import UnauthorizedError from '@/errors/Unauthorized';

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
      throw new UnauthorizedError(401);
    }
  } else {
    throw new Error('Something wrong happened');
  }

  return Promise.reject(err);
};
