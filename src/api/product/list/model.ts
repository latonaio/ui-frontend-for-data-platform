import { UIKeyGeneral } from '@/constants';
import { ProductItem } from '@/constants';

export interface params extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  General: ProductItem[]
}
