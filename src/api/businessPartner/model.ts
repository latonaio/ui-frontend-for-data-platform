import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
	BusinessPartner: {
    BusinessPartner: number;
    IsMarkedForDeletion: boolean;
  }
}
