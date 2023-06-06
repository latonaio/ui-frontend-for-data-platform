import { apiCall } from '../axios';
import { methods } from '@/constants/enums';
import { AuthenticatorParams, AuthenticatorResponse } from './model';

const postAuthenticate = async (
  params: AuthenticatorParams,
): Promise<AuthenticatorResponse> => {
  const endpointUrl = 'DPFM_AUTH_AUTHENTICATOR_SRV/auth';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data };
};

export {
  postAuthenticate,
};
