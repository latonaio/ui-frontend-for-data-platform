import { Accepter } from '@/constants';

export interface UpdatesParams extends Accepter {
  Orders: {
    OrderID?: number;
    PaymentTerms?: string;
    PaymentMethod?: string;
    TransactionCurrency?: string;
    OrderDate?: string;
    OrderItemTextByBuyer?: string;
  }
}

export interface CancelsParams extends Accepter {
  Orders: {
    OrderID?: number;
    PaymentTerms?: string;
    PaymentMethod?: string;
    TransactionCurrency?: string;
    OrderDate?: string;
    OrderItemTextByBuyer?: string;
  }
}
