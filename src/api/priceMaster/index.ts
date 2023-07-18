import { apiCall, multiPartFormApiCall, apiCallUpdate } from '../axios';
import { methods } from '@/constants/enums';
import {
  UpdatesParams,
  CancelsParams,
} from './model';

const creates = async (
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
  params: UpdatesParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_PRICEMASTER_SRV/updates';
  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const cancels = async (
  params: CancelsParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_PRICEMASTER_SRV/cancels';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const deletes = async (
  params: CancelsParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_PRICEMASTER_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  creates,
  updates,
  cancels,
  deletes,
};
