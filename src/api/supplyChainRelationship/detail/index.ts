import {
  params,
  response,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: params,
): Promise<response> => {
  const endpointUrl = `supply-chain-relationship/detail/${params.userType}/${params.supplyChainRelationshipId}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  reads,
};

