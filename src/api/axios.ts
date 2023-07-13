import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { methods } from '@/constants/enums';
import { getCookie } from '@/helpers/common';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { useDispatch } from 'react-redux';
import { config } from 'process';

const instance = axios.create();
instance.interceptors.response.use(responseInterceptor, errorInterceptor);

const apiConfig = (
	method: Method,
	endpointUrl = '',
	data: Record<string, any> = {},
	options?: AxiosRequestConfig,
	overrideBaseUrl?: string,
)=>{
  const accessToken = getCookie('accessToken');

  const config: AxiosRequestConfig = {
    ...options,
    baseURL: overrideBaseUrl,
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
  return config;
}


const apiCall = (
  method: Method,
  endpointUrl = '',
  data: Record<string, any> = {},
  options?: AxiosRequestConfig,
  overrideBaseUrl?: string,
): AxiosPromise => {
  const API_URL = `${process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_HOST}:` +
    `${process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_PORT}`;

	const config = apiConfig(method, endpointUrl, data, options, API_URL);

	return instance.request(config);
};


const multiPartFormApiCall = (
  method: Method,
  endpointUrl = '',
  data: FormData,
  options?: AxiosRequestConfig,
  overrideBaseUrl?: string,
): any => {
  const API_URL = `${process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_HOST}:` +
    `${process.env.NESTJS_DATA_CONNECTION_REQUEST_CONTROL_MANAGER_PORT}`;

  const accessToken = getCookie('accessToken');

  return instance.post(
    endpointUrl,
    data,
    {
      ...options,
      baseURL: overrideBaseUrl || API_URL,
      method,
      url: endpointUrl,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
        ...(options && options.headers ? options.headers : {}),
      },
    },
  );
}


const apiCallReads = (
	method: Method,
	endpointUrl = '',
	data: Record<string, any> = {},
	options?: AxiosRequestConfig,
	overrideBaseUrl?: string,
  ): AxiosPromise => {
	const API_URL = `${process.env.DATA_PLATFORM_REQUEST_READS_CACHE_MANAGER_HOST}:` +
	  `${process.env.DATA_PLATFORM_REQUEST_READS_CACHE_MANAGER_PORT}`;

	  const config = apiConfig(method, endpointUrl, data, options, API_URL);

	  return instance.request(config);
  };

//   const apiCallReadsa = (
// 	method: Method,
// 	endpointUrl = '',
// 	data: Record<string, any> = {},
// 	options?: AxiosRequestConfig,
// 	overrideBaseUrl?: string,
//   ): AxiosPromise => {
// 	const API_URL = `${process.env.DATA_PLATFORM_REQUEST_READS_CACHE_MANAGER_HOST}:` +
// 	  `${process.env.DATA_PLATFORM_REQUEST_READS_CACHE_MANAGER_POST}`;

// 	  const config: AxiosRequestConfig = {
// 		...options,
// 		baseURL: overrideBaseUrl,
// 		method,
// 		url: endpointUrl,
// 		headers: {
// 		  ...(options && options.headers ? options.headers : {}),
// 		  'Content-Type': 'application/json',
// 		  'Authorization': `Bearer ${accessToken}`,
// 		},
// 	  };

// 	  const payload = {
// 		...data,
// 	  } as Record<string, any>;

// 	  if (method === methods.GET) {
// 		Object.keys(payload).forEach((key) => {
// 		  if (payload[key] === null || payload[key] === '') {
// 			delete payload[key];
// 		  }
// 		});
// 		config.params = payload;
// 	  } else {
// 		config.data = payload;
// 	  }

// 	return instance.request(config);
//   };



export {
  apiCall,
  multiPartFormApiCall,
  apiCallReads,
};
