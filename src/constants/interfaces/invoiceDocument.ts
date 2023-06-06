interface InvoiceDocumentListItem {
  InvoiceDocument: number;
  BillToParty: string;
  BillFromParty: string;
  InvoiceDocumentDate: string;
  PaymentDueDate: string;
  HeaderBillingIsConfirmed: boolean;
  IsCancelled: boolean;
}

interface InvoiceDocumentDetailHeader {
  BillFromParty: string;
  BillToParty: string;
  HeaderBillingIsConfirmed: boolean;
  InvoiceDocument: number;
  InvoiceDocumentDate: string;
  InvoiceDocumentTime: string;
  PaymentDueDate: string;
}

interface InvoiceDocumentDetailListItem {
  ActualGoodsIssueDate: string;
  ActualGoodsIssueTime: string;
  ActualGoodsReceiptDate: string;
  ActualGoodsReceiptTime: string;
  InvoiceDocument: number;
  InvoiceDocumentItem: number;
  InvoiceDocumentItemText: string;
  InvoiceQuantityInBaseUnit: number;
  InvoiceQuantityUnit: string;
  Product: string;
  OrdersDetailJumpReq: {
    OrderID: number;
    OrderItem: number;
    Product: string;
    Buyer: number;
  };
  DeliveryDocumentDetailJumpReq: {
    Buyer: number;
    DeliverFromParty: number;
    DeliverToParty: number;
    DeliveryDocument: number;
    DeliveryDocumentItem: number;
    Product: string;
  }
  IsCancelled: boolean;
  ItemBillingIsConfirmed: boolean;
}

export type {
  InvoiceDocumentListItem,
  InvoiceDocumentDetailListItem,
  InvoiceDocumentDetailHeader,
}
