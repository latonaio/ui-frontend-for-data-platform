import { UIKeyGeneral } from '@/constants';
import { ProductionVersionListItem } from '@/constants';

export interface params extends UIKeyGeneral {
  headerIsMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  productionVersionList: ProductionVersionListItem[]
}
