import { Accepter } from "@/constants";

export interface DeleteParams extends Accepter{
	ProductionVersion: {
		ProductionVersion: number;
		IsMarkedForDeletion: boolean;
	}
}