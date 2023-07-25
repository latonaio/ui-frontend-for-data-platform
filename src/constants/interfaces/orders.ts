interface OrdersItem {
  OrderID: number;
  SellerName: string;
  Seller: number;
  BuyerName: string;
  Buyer: number;
  HeaderDeliveryStatus: string;
  OrderDate: string;
  PaymentTerms: string;
  PaymentTermsName: string;
  PaymentMethod: string;
  PaymentMethodName: string;
  TransactionCurrency: string;
  OrderType: string;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
}

interface BuyerItem extends OrdersItem {
}

interface SellerItem extends OrdersItem {
}

interface OrdersDetailListItem {
  OrderID?: number;
  OrderItem: number;
  Product: string;
  OrderItemTextByBuyer: string;
  OrderItemTextBySeller: string;
  OrderQuantityInDeliveryUnit: string;
  DeliveryUnit: string;
  ConditionRateValue: string;
  RequestedDeliveryDate: string;
  NetAmount: string;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
  SupplyChainRelationshipID: number;
  PricingProcedureCounter: number;
}

interface PaymentFormList {
  PaymentTermsList: PaymentTerms[];
  PaymentMethodList: PaymentMethod[];
  CurrencyList: Currency[];
  QuantityUnitList: QuantityUnit[];
}

interface OrdersDetailHeader extends PaymentFormList {
  OrderID: number;
  SellerName: string;
  Seller: number;
  BuyerName: string;
  Buyer: number;
  DeliveryStatus: string;
  OrderDate: string;
  PaymentTerms: string;
  PaymentTermsName: string;
  PaymentMethod: string;
  PaymentMethodName: string;
  TransactionCurrency: string;
  OrderType: string;
}

interface PaymentTerms {
  PaymentTerms: string;
  PaymentTermsName: string;
}

interface PaymentMethod {
  PaymentMethod: string;
  PaymentMethodName: string;
}

interface Currency {
  Currency: string;
  CurrencyName: string;
}

interface QuantityUnit {
  QuantityUnit: string;
  QuantityUnitName: string;
}

export type {
  OrdersItem,
  BuyerItem,
  SellerItem,
  OrdersDetailListItem,
  OrdersDetailHeader,
  PaymentTerms,
  PaymentMethod,
  Currency,
  QuantityUnit,
}
