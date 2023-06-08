import { UIKeyGeneral } from '@/constants';
import { WorkCenterItem } from '@/constants';

export interface params extends UIKeyGeneral {
  isMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  workCenterList: WorkCenterItem[]
}
