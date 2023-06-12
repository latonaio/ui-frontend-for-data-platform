import { BuyerItem, OrdersDetailListItem, SellerItem } from '@/constants';

export enum UserTypeEnum {
  Buyer = 'Buyer',
  Seller = 'Seller',
  DeliverToParty = 'DeliverToParty',
  DeliverFromParty = 'DeliverFromParty',
  BillToParty = 'BillToParty',
  BillFromParty = 'BillFromParty',
  OwnerProductionPlantBusinessPartner = 'OwnerProductionPlantBusinessPartner',
  BusinessPartner = 'BusinessPartner',
  OwnerBusinessPartner = 'OwnerBusinessPartner',
}

export enum OrdersTablesEnum {
  ordersListBuyerItem = 'ordersListBuyerItem', // 受注オーダー
  ordersListSellerItem = 'ordersListSellerItem', // 発注オーダー
  ordersDetailListBuyerItem = 'ordersDetailListBuyerItem',
  ordersDetailListSellerItem = 'ordersDetailListSellerItem',
  ordersDetailList = 'ordersDetailList',
  ordersDetailHeader = 'ordersDetailHeader',
  ordersDetail = 'ordersDetail',
}

export enum DeliveryDocumentTablesEnum {
  deliveryDocumentListEditDeliverToPartyItem = 'deliveryDocumentListEditDeliverToPartyItem',
  deliveryDocumentListEditDeliverFromPartyItem = 'deliveryDocumentListEditDeliverFromPartyItem',
  deliveryDocumentListDeliverToPartyItem = 'deliveryDocumentListDeliverToPartyItem', // 入荷
  deliveryDocumentListDeliverFromPartyItem = 'deliveryDocumentListDeliverFromPartyItem', // 出荷
  deliveryDocumentDetailListDeliverToPartyItem = 'deliveryDocumentDetailListDeliverToPartyItem',
  deliveryDocumentDetailListDeliverFromPartyItem = 'deliveryDocumentDetailListDeliverFromPartyItem',
  deliveryDocumentDetailList = 'deliveryDocumentDetailList',
  deliveryDocumentDetailHeader = 'deliveryDocumentDetailHeader',
  deliveryDocumentDetail = 'deliveryDocumentDetail',
}

export enum InvoiceDocumentTablesEnum {
  invoiceDocumentListBillToPartyItem = 'invoiceDocumentListBillToPartyItem', // 請求先名
  invoiceDocumentListBillFromPartyItem = 'invoiceDocumentListBillFromPartyItem', // 請求元名
  invoiceDocumentDetailListBillToPartyItem = 'invoiceDocumentDetailListBillToPartyItem',
  invoiceDocumentDetailListBillFromPartyItem = 'invoiceDocumentDetailListBillFromPartyItem',
  invoiceDocumentDetailList = 'invoiceDocumentDetailList',
  invoiceDocumentDetailHeader = 'invoiceDocumentDetailHeader',
}

export enum ProductionOrderTablesEnum {
  productionOrderListOwnerProductionPlantBusinessPartnerItem = 'productionOrderListOwnerProductionPlantBusinessPartnerItem',
  productionOrderDetailListOwnerProductionPlantBusinessPartnerItem = 'productionOrderDetailListOwnerProductionPlantBusinessPartnerItem',
  productionOrderDetailList = 'productionOrderDetailList',
  productionOrderDetailHeader = 'productionOrderDetailHeader',
  productionOrderDetail = 'productionOrderDetail',
}

export enum ProductTablesEnum {
  productListBusinessPartnerItem = 'productListBusinessPartnerItem',
  productDetailExconfList = 'productDetailExconfList',
  productDetailExconfListHeader = 'productDetailExconfListHeader',
}

export enum BusinessPartnerTablesEnum {
  businessPartnerListBusinessPartnerItem = 'businessPartnerListBusinessPartnerItem',
  businessPartnerDetailExconfList = 'businessPartnerDetailExconfList',
  businessPartnerDetailExconfListHeader = 'businessPartnerDetailExconfListHeader',

}

export enum EquipmentTablesEnum {
  equipmentListBusinessPartnerItem = 'equipmentListBusinessPartnerItem',
}


export enum ProductionVersionTablesEnum {
  productionVersionListOwnerBusinessPartnerItem = 'productionVersionListOwnerBusinessPartnerItem',
  productionVersionDetailList = 'productionVersionDetailList',
  productionVersionDetailHeader = 'productionVersionDetailHeader',
  productionVersionDetail = 'productionVersionDetail',
  ProductionVersionTablesEnum = "ProductionVersionTablesEnum"
}

export enum PriceMasterTablesEnum {
  priceMasterListBuyerItem = 'priceMasterListBuyerItem', // 受注オーダー
  priceMasterListSellerItem = 'priceMasterListSellerItem', // 発注オーダー
  priceMasterDetailListBuyerItem = 'priceMasterDetailListBuyerItem',
  priceMasterDetailListSellerItem = 'priceMasterDetailListSellerItem',
  priceMasterDetailHeader = 'priceMasterDetailHeader',
  priceMasterDetail = 'priceMasterDetail',
}

export enum BillOfMaterialTablesEnum {
  billOfMaterialListOwnerBusinessPartnerItem = 'billOfMaterialListOwnerBusinessPartnerItem',
}

export enum OperationsTablesEnum {
  operationsListOwnerBusinessPartnerItem = 'operationsListOwnerBusinessPartnerItem',
}

export enum SupplyChainRelationshipTablesEnum {
  supplyChainRelationshipListBuyerItem = 'supplyChainRelationshipListBuyerItem', // 受注オーダー
  supplyChainRelationshipListSellerItem = 'supplyChainRelationshipListSellerItem', // 発注オーダー
  supplyChainRelationshipDetailListBuyerItem = 'supplyChainRelationshipDetailListBuyerItem',
  supplyChainRelationshipDetailListSellerItem = 'supplyChainRelationshipDetailListSellerItem',
  supplyChainRelationshipDetailList = 'supplyChainRelationshipDetailList',
  supplyChainRelationshipDetailHeader = 'supplyChainRelationshipDetailHeader',
  supplyChainRelationshipDetail = 'supplyChainRelationshipDetail',
}

export enum WorkCenterTablesEnum {
	workCenterListBusinessPartnerItem = 'workCenterListBusinessPartnerItem',
}

