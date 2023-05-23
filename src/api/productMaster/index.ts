import apiCall from '../axios';
import { methods } from '@/constants/enums';
import { ReadProductParams, ReadProductResponse } from './model';

const readProduct = async (
  params: ReadProductParams,
): Promise<ReadProductResponse> => {
  const endpointUrl = 'DPFM_API_PRODUCT_MASTER_SRV/reads';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
}

export {
  readProduct,
};
