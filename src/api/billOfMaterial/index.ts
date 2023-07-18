import { apiCall, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';
import {
  DeleteParams,
  UpdateParams,
} from './model';

const deletes = async (
  params: DeleteParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_BILL_OF_MATERIAL_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const updates = async (
  params: UpdateParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_BILL_OF_MATERIAL_SRV/updates';
  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
	deletes,
	updates,
}

