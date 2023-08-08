import { Accepter, AuthedUser, InvoiceDocumentListItem } from '@/constants';

export interface CancelsParams extends Accepter {
  InvoiceDocument: {
    InvoiceDocument: number;
    IsCancelled: boolean;
  }
}
