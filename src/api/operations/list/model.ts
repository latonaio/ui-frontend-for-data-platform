import { UIKeyGeneral } from '@/constants';
import { OperationsItem } from '@/constants';

export interface params extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  operationsList: OperationsItem[]
}
