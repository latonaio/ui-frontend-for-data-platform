import { Method } from 'axios';

interface units {
  [key: string]: string;
}

export const units: units = {
  JPY: '円',
}

export const methods = {
  GET: 'GET' as Method,
  POST: 'POST' as Method,
  PUT: 'PUT' as Method,
  PATCH: 'PATCH' as Method,
  DELETE: 'DELETE' as Method,
};
