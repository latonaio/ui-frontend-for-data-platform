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
  const endpointUrl = `delivery-document/detail/${params.deliveryDocument}/${params.deliveryDocumentItem}/${params.userType}/${params.product}`;
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
  const endpointUrl = `delivery-document/detail/pagination/${params.deliveryDocument}/${params.deliveryDocumentItem}/${params.userType}/${params.product}`;
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
  const endpointUrl = `delivery-document/detail/list/${params.userType}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    itemCompleteDeliveryIsDefined: params.itemCompleteDeliveryIsDefined,
    // itemDeliveryStatus: params.itemDeliveryStatus,
    itemDeliveryBlockStatus: params.itemDeliveryBlockStatus,
    // isCancelled: params.isCancelled,
    // isMarkedForDeletion: params.isMarkedForDeletion,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    deliveryDocument: params.deliveryDocument,
  });
  return { ...response.data };
}

export {
  readsDetail,
  readsDetailList,
  readsPagination,
}
