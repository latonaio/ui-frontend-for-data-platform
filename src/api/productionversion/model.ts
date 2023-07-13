import { Accepter } from "@/constants";

export interface DeleteParams extends Accepter{
	ProductionVersion: {
		ProductionVersion: number;
		IsMarkedForDeletion: boolean;
	}
}
export interface UpdateParams extends Accepter{
	ProductionVersion: {
		ProductionVersion: number;
		IsMarkedForDeletion: boolean;
	}
}