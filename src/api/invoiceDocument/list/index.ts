import { apiCallReads } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsListParams,
  ReadsListResponse,
} from './model';

const readsList = async (
  params: ReadsListParams,
): Promise<ReadsListResponse> => {
  const endpointUrl = `invoice-document/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    headerPaymentBlockStatus: params.headerPaymentBlockStatus,
    // isCancelled: params.isCancelled,
  });
  return { ...response.data };
}

export {
  readsList,
}
