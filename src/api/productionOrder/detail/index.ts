import {
  ReadsDetailListParams,
  ReadsDetailListResponse,
  ReadsDetailParams,
  ReadsDetailResponse,
  ReadsPaginationResponse,
} from './model';
import { apiCall } from '@/api/axios';
import { methods } from '@/constants';

const readsDetailList = async (
  params: ReadsDetailListParams,
): Promise<ReadsDetailListResponse> => {
  const endpointUrl = `production-order/detail/list/${params.userType}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    productionOrderIsReleased: params.productionOrderIsReleased,
    isMarkedForDeletion: params.isMarkedForDeletion,
    // isCancelled: params.isCancelled,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    productionOrder: params.productionOrder,
  });
  return { ...response.data };
}

const readsDetail = async (
  params: ReadsDetailParams,
): Promise<ReadsDetailResponse> => {
  const endpointUrl = `production-order/detail/${params.productionOrder}/${params.productionOrderItem}/${params.userType}/${params.product}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

const readsPagination = async (
  params: ReadsDetailParams,
): Promise<ReadsPaginationResponse> => {
  const endpointUrl = `production-order/detail/pagination/${params.productionOrder}/${params.productionOrderItem}/${params.userType}/${params.product}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  readsDetailList,
  readsDetail,
  readsPagination,
}
