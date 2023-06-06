import { UIKeyGeneral } from '@/constants';
import { PriceMasterBuyerItem, PriceMasterSellerItem } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface ReadsResponse {
  priceMasterList: PriceMasterBuyerItem[] | PriceMasterSellerItem[]
}
