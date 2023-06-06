import { Method } from 'axios';
export * from './transactions';

interface keyStringMap {
  [key: string]: string;
}

export const units: keyStringMap = {
  JPY: '円',
}

export const methods = {
  GET: 'GET' as Method,
  POST: 'POST' as Method,
  PUT: 'PUT' as Method,
  PATCH: 'PATCH' as Method,
  DELETE: 'DELETE' as Method,
};

export const deliveryStatus: keyStringMap = {
  NP: '未入出荷',
  PP: '部分入出荷完了済',
  CL: '入出荷完了済',
}

export const billingStatus: keyStringMap = {
  NP: '未請求',
  PP: '部分請求完了',
  CL: '完全請求完了',
}
