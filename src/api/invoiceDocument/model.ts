import { Accepter } from '@/constants';

export interface CancelsParams extends Accepter {
  InvoiceDocument: {
    InvoiceDocument: number;
    IsCancelled: boolean;
  }
}
