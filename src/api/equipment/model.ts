import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
  Equipment: {
    Equipment: number;
    IsMarkedForDeletion: boolean;
  }
}

export interface UpdateParams extends Accepter {
  Equipment: {
    Equipment: number;
    IsMarkedForDeletion: boolean;
  }
}


