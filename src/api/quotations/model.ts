import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
	Quotations: {
    Quotations: number;
    IsMarkedForDeletion: boolean;
  }
}
export interface UpdateParams extends Accepter {
  Quotations: {
    Quotations: number;
    IsMarkedForDeletion: boolean;
  }
}

export interface CancelsParams extends Accepter {
	Quotations: {
		Quotations: number;
		IsMarkedForDeletion: boolean;
	  }
  }