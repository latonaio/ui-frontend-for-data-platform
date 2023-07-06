import { DeleteParams } from "./model"
import { apiCall } from "../axios"
import { methods } from "@/constants"

const deleteProdutionVersion = async (
	params: DeleteParams,
): Promise<any> => {
	const endpointUrl = 'DPFM_API_PRODUCT_MASTER_SRV/deletes';
	const response = await apiCall(methods.POST, endpointUrl, params);
	return { ...response.data.message };
}

export {
	deleteProdutionVersion
}