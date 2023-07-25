import { apiCallReads } from '../../axios';
import { methods } from '@/constants/enums';
import {
//   ReadsDetailParams,
//   ReadsDetailResponse,
  ReadsDetailListParams,
  ReadsDetailListResponse,
//   ReadsPaginationResponse,
} from './model';

// const readsDetail = async (
//   params: ReadsDetailParams,
// ): Promise<ReadsDetailResponse> => {
//   const endpointUrl = `priceMaster/detail/${params.orderId}/${params.orderItem}/${params.userType}/${params.product}`;
//   const response = await apiCallReads(methods.GET, endpointUrl, {
//     language: params.language,
//     businessPartner: params.businessPartner,
//     userId: params.userId,
//   });
//   return { ...response.data };
// };

// const readsPagination = async (
//   params: ReadsDetailParams,
// ): Promise<ReadsPaginationResponse> => {
//   const endpointUrl = `priceMaster/detail/pagination/${params.orderId}/${params.orderItem}/${params.userType}/${params.product}`;
//   const response = await apiCallReads(methods.GET, endpointUrl, {
//     language: params.language,
//     businessPartner: params.businessPartner,
//     userId: params.userId,
//   });
//   return { ...response.data };
// };

const readsDetailList = async (
  params: ReadsDetailListParams,
): Promise<ReadsDetailListResponse> => {
  const endpointUrl = `price-master/detail/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    userType: params.userType,
    // isMarkedForDeletion: params.isMarkedForDeletion,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
//   readsDetail,
//   readsPagination,
  readsDetailList,
};
