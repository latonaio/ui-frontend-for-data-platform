import { apiCallReads } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsParams,
  ReadsResponse,
} from './model';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `price-master/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
};
