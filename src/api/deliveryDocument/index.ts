import { apiCall, multiPartFormApiCall, apiCallUpdate } from '../axios';
import { methods } from '@/constants/enums';
import {
  ReadDeliveryDocumentParams,
  ReadDeliveryDocumentResponse,
  UpdateDeliveryDocumentParams,
  CancelParams,
} from './model';

const readDeliveryDocument = async (
  params: ReadDeliveryDocumentParams,
): Promise<ReadDeliveryDocumentResponse> => {
  const endpointUrl = 'DPFM_API_DELIVERY_DOCUMENT_SRV/reads';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const createDeliveryDocument = async (
  data: FormData,
  params: {
    business_partner: number;
  },
  endpointUrl: string,
): Promise<any> => {
  data.append('headerInfo', JSON.stringify({
    connection_key: 'request',
    result: true,
    redis_key: 'abcdefg',
    filepath: '/var/lib/aion/Data/rededge_sdc/abcdef.json',
    accepter: ['All'],
    business_partner: params.business_partner,
  }));

  const response = await multiPartFormApiCall(methods.POST, endpointUrl, data);
  return { ...response.data.message };
};

const updates = async (
  params: UpdateDeliveryDocumentParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_DELIVERY_DOCUMENT_SRV/updates';
  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const cancels = async (
  params: CancelParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_DELIVERY_DOCUMENT_SRV/cancels';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const deletes = async (
  params: CancelParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_DELIVERY_DOCUMENT_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  readDeliveryDocument,
  createDeliveryDocument,
  updates,
  cancels,
  deletes,
};
