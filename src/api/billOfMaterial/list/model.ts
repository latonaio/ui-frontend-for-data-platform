import { UIKeyGeneral } from '@/constants';
import { BillOfMaterialListItem } from '@/constants';

export interface params extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  billOfMaterialList: BillOfMaterialListItem[]
}
