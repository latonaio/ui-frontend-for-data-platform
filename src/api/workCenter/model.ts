import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
  WorkCenter: {
    WorkCEnter: number;
    IsMarkedForDeletion: boolean;
  }
}
export interface UpdateParams extends Accepter {
  WorkCenter: {
    WorkCEnter: number;
    IsMarkedForDeletion: boolean;
  }
}
