import { UIKeyGeneral } from '@/constants';
import { EquipmentItem } from '@/constants';

export interface params extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  equipmentList: EquipmentItem[]
}
