import { DeleteParams,
	     params,
         response,
		 UpdateParams, } from './model';
import { apiCall } from '@/api/axios';
import { methods } from '@/constants';

const deletes = async (
  params: DeleteParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_OPERATIONS_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const updates = async (
	params: UpdateParams,
  ): Promise<any> => {
	const endpointUrl = 'DPFM_API_OPERATIONS_SRV/updates';
	const response = await apiCall(methods.POST, endpointUrl, params);
	return { ...response.data.message };
  };

export {
  deletes,
  updates
}
