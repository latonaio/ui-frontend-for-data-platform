import { DeleteParams, UpdateParams } from './model';
import { apiCall } from '@/api/axios';
import { methods } from '@/constants';
// import {
//   UpdatesParams,
// } from './model';

const deletes = async (
  params: DeleteParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_PRODUCT_MASTER_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

const updates = async (
  params: UpdateParams,
): Promise<any> => {
  const endpointUrl = 'DPFM_API_PRODUCT_MASTER_SRV/deletes';
  const response = await apiCall(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
	deletes,
	updates
}



// const creates = async (
//   data: FormData,
//   params: {
//     business_partner: number;
//   },
//   endpointUrl: string,
// ): Promise<any> => {
//   data.append('headerInfo', JSON.stringify({
//     connection_key: 'request',
//     result: true,
//     redis_key: 'abcdefg',
//     filepath: '/var/lib/aion/Data/rededge_sdc/abcdef.json',
//     accepter: ['All'],
//     business_partner: params.business_partner,
//   }));

//   const response = await multiPartFormApiCall(methods.POST, endpointUrl, data);
//   return { ...response.data.message };
// };

// const updates = async (
//   params: UpdatesParams,
// ): Promise<any> => {
//   const endpointUrl = 'DPFM_API_ORDERS_SRV/updates';
//   const response = await apiCall(methods.POST, endpointUrl, params);
//   return { ...response.data.message };
// };


// export {
//   // creates,
//   // updates,
// };
