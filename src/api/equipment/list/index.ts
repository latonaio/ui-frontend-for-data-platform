import {
  params,
  response,
} from './model';
import { apiCall } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: params,
): Promise<response> => {
  const endpointUrl = `equipment/list/${params.userType}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    // isMarkedForDeletion: params.isMarkedForDeletion,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
};
