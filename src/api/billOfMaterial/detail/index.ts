import { apiCallReads } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsDetailListParams,
  ReadsDetailListResponse,
} from './model';

const readsDetailList = async (
  params: ReadsDetailListParams,
): Promise<ReadsDetailListResponse> => {
  const endpointUrl = `bill-of-material/detail/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    userType: params.userType,
    billOfMaterial: params.billOfMaterial,
    // isMarkedForDeletion: params.isMarkedForDeletion,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  // readsDetail,
  // readsPagination,
  readsDetailList,
};
