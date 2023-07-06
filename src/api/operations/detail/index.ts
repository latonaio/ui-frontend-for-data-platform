import { apiCall } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsDetailListParams,
  ReadsDetailListResponse,
//   ReadsPaginationResponse,
} from './model';

const readsDetailList = async (
  params: ReadsDetailListParams,
): Promise<ReadsDetailListResponse> => {
  const endpointUrl = `operations/detail/list/${params.userType}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    userType: params.userType,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  readsDetailList,
};

