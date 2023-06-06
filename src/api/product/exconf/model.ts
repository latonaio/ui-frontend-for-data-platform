import {
  ProductItem,
  UIKeyGeneral,
  ProductDetailExconfList,
} from '@/constants';

export interface params extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  product: string;
  userType: string;
}

export interface response {
  productDetailExconfListHeader: ProductItem;
  productDetailExconfList: ProductDetailExconfList;
}
