import {
  DeliveryDocumentDetailListItem,
  DeliveryDocumentDetailHeader,
  UIKeyGeneral,
  DeliveryDocumentDetailProps,
  Pagination,
} from '@/constants';

export interface ReadsDetailParams extends UIKeyGeneral {
  userType: string;
  deliveryDocument: number;
  deliveryDocumentItem: number;
  product: string;
}

interface DetailPagination {
  Paginations: {
    DeliveryDocument: number;
    DeliveryDocumentItem: number;
    Product: string;
  }[];
}

export interface ReadsPaginationResponse {
  deliveryDocumentDetailPagination: DetailPagination;
}

export interface ReadsDetailListParams extends UIKeyGeneral {
  itemCompleteDeliveryIsDefined: boolean;
  // itemDeliveryStatus: boolean;
  itemDeliveryBlockStatus: boolean;
  // isCancelled: boolean;
  // isMarkedForDeletion: boolean;
  deliveryDocument: number;
  userType: string;
}

export interface ReadsDetailListResponse extends Pagination {
  deliveryDocumentDetailList: DeliveryDocumentDetailListItem[];
  deliveryDocumentDetailHeader: DeliveryDocumentDetailHeader;
}

export interface ReadsDetailResponse {
  deliveryDocumentDetail: DeliveryDocumentDetailProps;
}
