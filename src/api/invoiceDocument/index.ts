import { apiCall } from '../axios';
import { methods } from '@/constants/enums';
import {
  CancelsParams,
} from './model';

const cancels = async (
  params: CancelsParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_INVOICE_DOCUMENT_SRV/cancels';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const updates = async (
  params: any,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_INVOICE_DOCUMENT_SRV/updates';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  cancels,
  updates,
};
