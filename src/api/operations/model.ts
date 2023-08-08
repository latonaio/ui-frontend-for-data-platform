import { Accepter } from '@/constants';
import { UIKeyGeneral } from '@/constants';
import { OperationsItem } from '@/constants';

export interface DeleteParams extends Accepter {
  Operations: {
    Operations: number;
    IsMarkedForDeletion: boolean;
  }
}

export interface params extends UIKeyGeneral {
  headerIsMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  operationsList: OperationsItem[]
}
