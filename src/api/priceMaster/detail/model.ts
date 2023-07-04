import {
  PriceMasterDetailHeader,
  PriceMasterDetailListItem,
  UIKeyGeneral,
  PriceMasterDetailProps,
  Pagination,
} from '@/constants';

export interface ReadsDetailParams extends UIKeyGeneral {
  userType: string;
  orderId: number;
  orderItem: number;
  product: string;
}

interface DetailPagination {
  Paginations: {
    OrderID: number;
    OrderItem: number;
    Product: string;
  }[];
}

export interface ReadsDetailResponse {
  priceMasterDetail: PriceMasterDetailProps;
}

export interface ReadsPaginationResponse {
  priceMasterDetailPagination: DetailPagination;
}

export interface ReadsDetailListParams extends UIKeyGeneral {
  userType: string;
  supplyChainRelationshipId: number;
  // isMarkedForDeletion: boolean;
}

export interface ReadsDetailListResponse extends Pagination {
  priceMasterDetailList: PriceMasterDetailListItem[];
  priceMasterDetailHeader: PriceMasterDetailHeader;
}
