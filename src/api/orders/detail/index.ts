import { apiCall } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsDetailParams,
  ReadsDetailResponse,
  ReadsDetailListParams,
  ReadsDetailListResponse,
  ReadsPaginationResponse,
} from './model';

const readsDetail = async (
  params: ReadsDetailParams,
): Promise<ReadsDetailResponse> => {
  const endpointUrl = `orders/detail/${params.orderId}/${params.orderItem}/${params.userType}/${params.product}`;
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
  const endpointUrl = `orders/detail/pagination/${params.orderId}/${params.orderItem}/${params.userType}/${params.product}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

const readsDetailList = async (
  params: ReadsDetailListParams,
): Promise<ReadsDetailListResponse> => {
  const endpointUrl = `orders/detail/list/${params.userType}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    userType: params.userType,
    orderId: params.orderId,
    itemCompleteDeliveryIsDefined: params.itemCompleteDeliveryIsDefined,
    // itemDeliveryStatus: params.itemDeliveryStatus,
    itemDeliveryBlockStatus: params.itemDeliveryBlockStatus,
    // isCancelled: params.isCancelled,
    // isMarkedForDeletion: params.isMarkedForDeletion,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  readsDetail,
  readsPagination,
  readsDetailList,
};
