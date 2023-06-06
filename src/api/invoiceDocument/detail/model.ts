import {
  InvoiceDocumentDetailListItem,
  InvoiceDocumentDetailHeader,
  UIKeyGeneral,
  Pagination,
} from '@/constants';

export interface ReadsDetailListParams extends UIKeyGeneral {
  itemPaymentBlockStatus: boolean;
  // isCancelled: boolean;
  invoiceDocument: number;
  userType: string;
}

export interface ReadsDetailListResponse extends Pagination {
  invoiceDocumentDetailList: InvoiceDocumentDetailListItem[];
  invoiceDocumentDetailHeader: InvoiceDocumentDetailHeader;
}
