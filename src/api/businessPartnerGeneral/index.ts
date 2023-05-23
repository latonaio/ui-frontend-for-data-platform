import apiCall from '../axios';
import { methods } from '@/constants/enums';
import { ReadBusinessPartnerGeneralParams, ReadBusinessPartnerGeneralResponse } from '@/api/businessPartnerGeneral/model';

export const readBusinessPartnerGeneral = async (
  params: ReadBusinessPartnerGeneralParams,
): Promise<ReadBusinessPartnerGeneralResponse> => {
  const endpointUrl = 'DPFM_API_BUSINESS_PARTNER_SRV_GENERAL/reads';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};
