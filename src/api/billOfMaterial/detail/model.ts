import {
  BillOfMaterialDetailHeader,
  BillOfMaterialDetailListItem,
  UIKeyGeneral,
  BillOfMaterialDetailProps,
  Pagination,
  PaymentTerms,
  PaymentMethod,
  Currency,
  QuantityUnit,
} from '@/constants';

export interface ReadsDetailParams extends UIKeyGeneral {
  userType: string;
  billOfMaterial: number;
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
  billOfMaterialDetail: BillOfMaterialDetailProps;
}

export interface ReadsPaginationResponse {
  billOfMaterialDetailPagination: DetailPagination;
}

export interface ReadsDetailListParams extends UIKeyGeneral {
  userType: string;
  billOfMaterial: number;
  // isMarkedForDeletion: boolean;
}

export interface ReadsDetailListResponse extends Pagination {
  Item: BillOfMaterialDetailListItem[];
  Header: BillOfMaterialDetailHeader;
}
