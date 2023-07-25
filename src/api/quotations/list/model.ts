import { UIKeyGeneral } from '@/constants';
import { QuotationsBuyerItem, QuotationsSellerItem } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface ReadsResponse {
  Header: QuotationsBuyerItem[] | QuotationsSellerItem[]
}
