import apiCall from '../axios';
import { methods } from '@/constants/enums';
import { ReadProductGroupParams, ReadProductGroupResponse } from './model';

const readProductGroup = async (
  params: ReadProductGroupParams,
): Promise<ReadProductGroupResponse> => {
  const endpointUrl = 'DPFM_API_PRODUCT_GROUP_SRV/reads';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
}

export {
  readProductGroup,
};
