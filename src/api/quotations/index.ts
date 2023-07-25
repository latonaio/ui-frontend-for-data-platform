import { DeleteParams, UpdateParams, CancelsParams } from './model';
import { apiCall, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const deletes = async (
  params: DeleteParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_QUOTATIONS_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};
const updates = async (
  params: UpdateParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_QUOTATIONS_SRV/deletes';
  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};
const cancels = async (
	params: CancelsParams,
  ): Promise<any> => {
	const endpointUrl = 'DPFM_API_QUOTATIONS_SRV/cancels';
	const response = await apiCall(methods.POST, endpointUrl, params);
	return { ...response.data.message };
  };

export {
  deletes,
  updates,
  cancels
}
