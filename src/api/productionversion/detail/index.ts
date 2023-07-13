import { apiCallReads } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsDetailListParams,
  ReadsDetailListResponse,
//   ReadsPaginationResponse,
} from './model';

const readsDetailList = async (
  params: ReadsDetailListParams,
): Promise<ReadsDetailListResponse> => {
  const endpointUrl = `production-version/detail/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    userType: params.userType,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    productionVersion: params.productionVersion,
  });
  return { ...response.data };
};

export {
  readsDetailList,
};

