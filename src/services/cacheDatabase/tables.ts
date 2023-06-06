import Dexie, { Table } from 'dexie';
import {
  BuyerItem,
  DeliverFromPartyItem,
  DeliverToPartyItem,
  DeliveryDocumentDetailListItem,
  OrdersDetailListItem,
  OrdersProductDetailProps,
  SellerItem,
  OrdersDetailHeader,
  DeliveryDocumentDetailHeader,
  DeliveryDocumentDetailProps,
  InvoiceDocumentListItem,
  InvoiceDocumentDetailListItem,
  InvoiceDocumentDetailHeader,
  OrdersTablesEnum,
  DeliveryDocumentTablesEnum,
  InvoiceDocumentTablesEnum,
  ProductionOrderTablesEnum,
  ProductionOrderItem,
  ProductionOrderDetailListItem,
  ProductionOrderDetailHeader,
  ProductionOrderDetailProps,
  ProductItem,
  ProductTablesEnum,
  ProductDetailExconfList,
  ProductDetailExconfListHeader,
  BusinessPartnerTablesEnum,
  BusinessPartnerItem,
  EquipmentTablesEnum,
  EquipmentItem, DeliveryDocumentListEditForCache,
  PriceMasterTablesEnum,
  PriceMasterBuyerItem,
  PriceMasterSellerItem,
  BillOfMaterialTablesEnum,
  BillOfMaterialListItem,
  OperationsTablesEnum,
  OperationsItem,
} from '@/constants';

export class Tables extends Dexie {
  [OrdersTablesEnum.ordersListBuyerItem]!: Table<BuyerItem>;
  [OrdersTablesEnum.ordersListSellerItem]!: Table<SellerItem>;
  [OrdersTablesEnum.ordersDetailListBuyerItem]!: Table<OrdersDetailListItem>;
  [OrdersTablesEnum.ordersDetailListSellerItem]!: Table<OrdersDetailListItem>;
  [OrdersTablesEnum.ordersDetailHeader]!: Table<OrdersDetailHeader>;
  [OrdersTablesEnum.ordersDetail]!: Table<OrdersProductDetailProps>;
  [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem]!: Table<DeliveryDocumentListEditForCache>;
  [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem]!: Table<DeliveryDocumentListEditForCache>;
  [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]!: Table<DeliverToPartyItem>;
  [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]!: Table<DeliverFromPartyItem>;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetailListDeliverToPartyItem]!: Table<DeliveryDocumentDetailListItem>;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetailListDeliverFromPartyItem]!: Table<DeliveryDocumentDetailListItem>;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetailHeader]!: Table<DeliveryDocumentDetailHeader>;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetail]!: Table<DeliveryDocumentDetailProps>;
  [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]!: Table<InvoiceDocumentListItem>;
  [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]!: Table<InvoiceDocumentListItem>;
  [InvoiceDocumentTablesEnum.invoiceDocumentDetailListBillToPartyItem]!: Table<InvoiceDocumentDetailListItem>;
  [InvoiceDocumentTablesEnum.invoiceDocumentDetailListBillFromPartyItem]!: Table<InvoiceDocumentDetailListItem>;
  [InvoiceDocumentTablesEnum.invoiceDocumentDetailHeader]!: Table<InvoiceDocumentDetailHeader>;
  [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]!: Table<ProductionOrderItem>;
  [ProductionOrderTablesEnum.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem]!: Table<ProductionOrderDetailListItem>;
  [ProductionOrderTablesEnum.productionOrderDetailHeader]!: Table<ProductionOrderDetailHeader>;
  [ProductionOrderTablesEnum.productionOrderDetail]!: Table<ProductionOrderDetailProps>;
  [ProductTablesEnum.productListBusinessPartnerItem]!: Table<ProductItem>;
  [ProductTablesEnum.productDetailExconfListHeader]!: Table<ProductDetailExconfListHeader>;
  [ProductTablesEnum.productDetailExconfList]!: Table<ProductDetailExconfList>;
  [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]!: Table<BusinessPartnerItem>;
  [EquipmentTablesEnum.equipmentListBusinessPartnerItem]!: Table<EquipmentItem>;
  [PriceMasterTablesEnum.priceMasterListBuyerItem]!: Table<PriceMasterBuyerItem>;
  [PriceMasterTablesEnum.priceMasterListSellerItem]!: Table<PriceMasterSellerItem>;
  [PriceMasterTablesEnum.priceMasterDetailListBuyerItem]!: Table<OrdersDetailListItem>;
  [PriceMasterTablesEnum.priceMasterDetailListSellerItem]!: Table<OrdersDetailListItem>;
  [PriceMasterTablesEnum.priceMasterDetailHeader]!: Table<OrdersDetailHeader>;
  [PriceMasterTablesEnum.priceMasterDetail]!: Table<OrdersProductDetailProps>;
  [BillOfMaterialTablesEnum.billOfMaterialListOwnerBusinessPartnerItem]!: Table<BillOfMaterialListItem>;
  [OperationsTablesEnum.operationsListOwnerBusinessPartnerItem]!: Table<OperationsItem>;
}
