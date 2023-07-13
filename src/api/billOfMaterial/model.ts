import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
  BillOfMaterial: {
    BillOfMaterial: number;
    IsMarkedForDeletion: boolean;
  }
}

export interface UpdateParams extends Accepter {
  BillOfMaterial: {
    BillOfMaterial: number;
    IsMarkedForDeletion: boolean;
  }
}

