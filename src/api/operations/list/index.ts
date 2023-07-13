import {
  params,
  response,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: params,
): Promise<response> => {
  const endpointUrl = `operations/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    // isMarkedForDeletion: params.isMarkedForDeletion,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  console.log(response.data)
  return { ...response.data };
}

export {
  reads,
};
