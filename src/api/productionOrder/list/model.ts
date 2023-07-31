import { ProductionOrderDetailListItem, UIKeyGeneral } from '@/constants';
import { ProductionOrderItem } from '@/constants';

export interface params extends UIKeyGeneral {
  headerIsMarkedForDeletion: boolean;
  userType: string;
}

export interface response {
  Header: ProductionOrderItem[];
  Item: ProductionOrderDetailListItem[];
}
