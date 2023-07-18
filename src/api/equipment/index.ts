import { DeleteParams } from './model';
import { apiCall, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const deletes = async (
  params: DeleteParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_EQUIPMENT_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const updates = async (
	params: DeleteParams,
  ): Promise<any> => {
	const endpointUrl = 'DPFM_API_EQUIPMENT_SRV/updates';
	const response = await apiCallUpdate(methods.POST, endpointUrl, params);
	return { ...response.data.message };
  };

export {
  deletes,
  updates,
}
