import { apiCall } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsParams,
  ReadsResponse,
} from './model';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `orders/list/${params.userType}`;
  const response = await apiCall(methods.GET, endpointUrl, {
    headerCompleteDeliveryIsDefined: params.headerCompleteDeliveryIsDefined,
    headerDeliveryStatus: params.headerDeliveryStatus,
    headerDeliveryBlockStatus: params.headerDeliveryBlockStatus,
    // isCancelled: params.isCancelled,
    // isMarkedForDeletion: params.isMarkedForDeletion,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
};
