import {
  InvoiceDocumentListItem,
  UIKeyGeneral,
} from '@/constants';

export interface ReadsListParams extends UIKeyGeneral {
  headerPaymentBlockStatus: boolean;
  // isCancelled: boolean;
  userType: string;
}

export interface ReadsListResponse {
  invoiceDocuments: InvoiceDocumentListItem[];
}
