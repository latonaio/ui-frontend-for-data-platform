import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
  WorkCenter: {
    WorkCEnter: number;
    IsMarkedForDeletion: boolean;
  }
}
