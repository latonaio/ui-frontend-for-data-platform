import {
  OrdersDetailHeader,
  OrdersDetailListItem,
  UIKeyGeneral,
  OrdersProductDetailProps,
  Pagination,
  PaymentTerms,
  PaymentMethod,
  Currency,
  QuantityUnit,
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
  ordersDetail: OrdersProductDetailProps;
}

export interface ReadsPaginationResponse {
  ordersDetailPagination: DetailPagination;
}

export interface ReadsDetailListParams extends UIKeyGeneral {
  userType: string;
  orderId: number;
  buyer: number | null;
  seller: number | null;
  itemCompleteDeliveryIsDefined: boolean;
  // itemDeliveryStatus: boolean;
  itemDeliveryBlockStatus: boolean;
  // isCancelled: boolean;
  // isMarkedForDeletion: boolean;
}

export interface ReadsDetailListResponse extends Pagination {
  Header: OrdersDetailHeader;
  HeaderWithItem: OrdersDetailHeader[];
  Item: OrdersDetailListItem[];
  // ordersDetailList: OrdersDetailListItem[];
  // ordersDetailHeader: OrdersDetailHeader;
  paymentTerms: PaymentTerms[];
  paymentMethod: PaymentMethod[];
  currency: Currency[];
  quantityUnit: QuantityUnit[];
}
