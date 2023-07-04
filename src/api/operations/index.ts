import { DeleteParams,
	     params,
         response, } from './model';
import { apiCall } from '@/api/axios';
import { methods } from '@/constants';

const deleteOperations = async (
  params: DeleteParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_OPERATIONS_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  deleteOperations,
}
