import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
  Operations: {
    Operations: number;
    IsMarkedForDeletion: boolean;
  }
}
