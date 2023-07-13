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
  SupplyChainRelationshipID: number;
  Buyer: number;
  Seller: number;
  ConditionRecord: number;
  ConditionSequentialNumber: number;
  ConditionValidityEndDate: string;
  ConditionValidityStartDate: string;
//   ConditionQuantityUnit: string;
  Product: string;
  ProductDescription: string;
  ConditionType: string;
  CreationDate: string;
  LastChangeDate: string;
  ConditionRateValue: number;
  ConditionRateValueUnit: string;
  ConditionScaleQuantity: number;
  ConditionRateRatio: number;
  ConditionRateRatioUnit: string;
  ConditionCurrency: string;
  ConditionIsDeleted: boolean;
  IsMarkedForDeletion: boolean;
}

interface PriceMasterDetailHeader {
  SupplyChainRelationshipID: number;
  Buyer: number;
  BuyerName: string;
  Seller: number;
  SellerName: string;
}

interface PriceMasterPaymentFormList {
  PaymentTermsList: PriceMasterPaymentTerms[];
  PaymentMethodList: PriceMasterPaymentMethod[];
  CurrencyList: PriceMasterCurrency[];
  QuantityUnitList: PriceMasterQuantityUnit[];
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





