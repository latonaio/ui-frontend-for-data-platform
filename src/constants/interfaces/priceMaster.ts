interface PriceMasterItem{
    SupplyChainRelationshipID: number;
    Buyer: String;
    BuyerName: String;
    Seller: String;
    SellerName: String;
}

interface PriceMasterBuyerItem extends PriceMasterItem {
}

interface PriceMasterSellerItem extends PriceMasterItem {
}

interface PriceMasterDetailListItem {
  SupplyChainRelationshipID?: number;
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
  PricingProcedureCounter: number;
}

interface PriceMasterPaymentFormList {
  PaymentTermsList: PriceMasterPaymentTerms[];
  PaymentMethodList: PriceMasterPaymentMethod[];
  CurrencyList: PriceMasterCurrency[];
  QuantityUnitList: PriceMasterQuantityUnit[];
}

interface PriceMasterDetailHeader extends PriceMasterPaymentFormList {
  SupplyChainRelationshipID: number;
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

interface PriceMasterPaymentTerms {
  PaymentTerms: string;
  PaymentTermsName: string;
}

interface PriceMasterPaymentMethod {
  PaymentMethod: string;
  PaymentMethodName: string;
}

interface PriceMasterCurrency {
  Currency: string;
  CurrencyName: string;
}

interface PriceMasterQuantityUnit {
  QuantityUnit: string;
  QuantityUnitName: string;
}

export type{
    PriceMasterItem,
    PriceMasterBuyerItem,
    PriceMasterSellerItem,
    PriceMasterDetailListItem,
    PriceMasterDetailHeader,
    PriceMasterPaymentTerms,
    PriceMasterPaymentMethod,
    PriceMasterCurrency,
    PriceMasterQuantityUnit,
}





