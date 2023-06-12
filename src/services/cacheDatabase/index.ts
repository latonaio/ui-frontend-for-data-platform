import { env } from '@/helpers/env';
import { Tables } from './tables';
import {
  BusinessPartnerTablesEnum,
  DeliveryDocumentTablesEnum,
  InvoiceDocumentTablesEnum,
  OrdersTablesEnum,
  ProductionOrderTablesEnum,
  ProductTablesEnum,
  EquipmentTablesEnum,
  PriceMasterTablesEnum,
  BillOfMaterialTablesEnum,
  OperationsTablesEnum,
  SupplyChainRelationshipTablesEnum,
  WorkCenterTablesEnum,
  ProductionVersionTablesEnum,
} from '@/constants';

export class CacheDatabase extends Tables {
  constructor() {
    super('db');
    this.version(Number(env.cacheDatabaseVersion)).stores({
      [OrdersTablesEnum.ordersListBuyerItem]: '++id, OrderID, BuyerName, SellerName, DeliveryStatus',
      [OrdersTablesEnum.ordersListSellerItem]: '++id, OrderID, BuyerName, SellerName, DeliveryStatus',
      [OrdersTablesEnum.ordersDetailListBuyerItem]: '[OrderID+OrderItem]',
      [OrdersTablesEnum.ordersDetailListSellerItem]: '[OrderID+OrderItem]',
      [OrdersTablesEnum.ordersDetailHeader]: 'OrderID',
      [OrdersTablesEnum.ordersDetail]: '[OrderID+OrderItem+Product]',
      [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem]: 'SupplyChainRelationshipID',
      [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem]: 'SupplyChainRelationshipID',
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: '++id, DeliveryDocument, DeliverToParty, DeliverFromParty, HeaderDeliveryStatus, HeaderBillingStatus',
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: '++id, DeliveryDocument, DeliverToParty, DeliverFromParty, HeaderDeliveryStatus, HeaderBillingStatus',
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailListDeliverToPartyItem]: '[DeliveryDocument+DeliveryDocumentItem]',
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailListDeliverFromPartyItem]: '[DeliveryDocument+DeliveryDocumentItem]',
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailHeader]: 'DeliveryDocument',
      [DeliveryDocumentTablesEnum.deliveryDocumentDetail]: '[DeliveryDocument+DeliveryDocumentItem+Product]',
      [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]: '++id, InvoiceDocument, BillToParty, BillFromParty, HeaderPaymentBlockStatus',
      [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]: '++id, InvoiceDocument, BillToParty, BillFromParty, HeaderPaymentBlockStatus',
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailListBillToPartyItem]: '[InvoiceDocument+InvoiceDocumentItem]',
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailListBillFromPartyItem]: '[InvoiceDocument+InvoiceDocumentItem]',
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailHeader]: 'InvoiceDocument',
      [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]: 'ProductionOrder',
      [ProductionOrderTablesEnum.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem]: '[ProductionOrder+ProductionOrderItem]',
      [ProductionOrderTablesEnum.productionOrderDetailHeader]: 'ProductionOrder',
      [ProductionOrderTablesEnum.productionOrderDetail]: '[ProductionOrder+ProductionOrderItem+Product]',
      [ProductTablesEnum.productListBusinessPartnerItem]: 'Product, ProductDescription, ProductGroup, BaseUnit, ValidityStartDate',
      [ProductTablesEnum.productDetailExconfListHeader]: 'Product',
      [ProductTablesEnum.productDetailExconfList]: 'Product',
      [EquipmentTablesEnum.equipmentListBusinessPartnerItem]: 'Equipment, EquipmentDescription, EquipmentGroup, BaseUnit, ValidityStartDate',
      [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: '++id, BusinessPartner',
      [PriceMasterTablesEnum.priceMasterListBuyerItem]: '++id',
      [PriceMasterTablesEnum.priceMasterListSellerItem]: '++id',
      [PriceMasterTablesEnum.priceMasterDetailListBuyerItem]: '[SupplyChainRelationshipID+OrderItem]',
      [PriceMasterTablesEnum.priceMasterDetailListSellerItem]: '[SupplyChainRelationshipID+OrderItem]',
      [BillOfMaterialTablesEnum.billOfMaterialListOwnerBusinessPartnerItem]: '++id',
      [OperationsTablesEnum.operationsListOwnerBusinessPartnerItem]: 'Operations',
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: '++id, SupplyChainRelationship, BuyerName, SellerName, DeliveryStatus',
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: '++id, SupplyChainRelationship, BuyerName, SellerName, DeliveryStatus',
      [WorkCenterTablesEnum.workCenterListBusinessPartnerItem]: '++id',
      [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]: 'ProductionVersion',
    });
  }

  async cacheAllClear() {
    this.tables.forEach((table) => {
      table.clear();
    });
  }
}
