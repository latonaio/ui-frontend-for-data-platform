import { apiCallReads } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsListParams,
  ReadsListResponse,
} from './model';

const readsList = async (
  params: ReadsListParams,
): Promise<ReadsListResponse> => {
  const endpointUrl = `delivery-document/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    // headerCompleteDeliveryIsDefined: params.headerCompleteDeliveryIsDefined,
    // headerDeliveryStatus: params.headerDeliveryStatus,
    // headerBillingStatus: params.headerBillingStatus,
    // headerDeliveryBlockStatus: params.headerDeliveryBlockStatus,
    // headerIssuingBlockStatus: params.headerIssuingBlockStatus,
    // headerReceivingBlockStatus: params.headerReceivingBlockStatus,
    // headerBillingBlockStatus: params.headerBillingBlockStatus,
    headerBillingStatusException: params.headerBillingStatusException,
    // isCancelled: params.isCancelled,
    // isMarkedForDeletion: params.isMarkedForDeletion,
  });
  return { ...response.data };
};

export {
  readsList,
};
