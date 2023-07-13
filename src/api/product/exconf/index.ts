import {
  params,
  response,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: params,
): Promise<response> => {
  const endpointUrl = `product/detail/exconf/list/${params.userType}/${params.product}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
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
