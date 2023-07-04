import {
  params,
  response,
} from './model';
import { apiCall } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: params,
): Promise<response> => {
  const endpointUrl = `supply-chain-relationship/detail/exconf/list/${params.userType}/${params.supplyChainRelationshipId}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    // isMarkedForDeletion: params.isMarkedForDeletion,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  reads,
};

