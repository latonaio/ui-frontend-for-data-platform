import {
  ReadsDetailListParams,
  ReadsDetailListResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const readsDetailList = async (
  params: ReadsDetailListParams,
): Promise<ReadsDetailListResponse> => {
  const endpointUrl = `invoice-document/detail/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    itemPaymentBlockStatus: params.itemPaymentBlockStatus,
    // isCancelled: params.isCancelled,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    invoiceDocument: params.invoiceDocument,
  });
  return { ...response.data };
}

export {
  readsDetailList,
}
