import { DeleteParams, UpdateParams } from './model';
import { apiCall, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const deletes = async (
  params: DeleteParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_WORK_CENTER_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};
const updates = async (
  params: DeleteParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_WORK_CENTER_SRV/deletes';
  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  deletes,
  updates
}
