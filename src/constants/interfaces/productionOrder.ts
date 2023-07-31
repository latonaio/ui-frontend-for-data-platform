import { ProductionVersionImage } from '@/constants';

interface ProductionOrderItem {
  ProductionOrder: number;
  MRPArea: number;
  Product: number;
  ProductName: number;
  OwnerProductionPlantBusinessPartner: number;
  OwnerProductionPlant: number;
  TotalQuantity: number;
  HeaderIsConfirmed: boolean;
  HeaderIsPartiallyConfirmed: boolean;
  HeaderIsReleased: boolean;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
  Images: {
    DocID: {};
    Product: {
      BusinessPartnerID: number;
      DocID: string;
      FileExtension: string;
    };
  };
}

interface ProductionOrderDetailListItem {
  ProductionOrder: number;
  ProductionOrderItem: number;
  Product: string;
  ProductName: string;
  OrderItemTextBySeller: string;
  TotalQuantity: number;
  ConfirmedYieldQuantity: number;
  ItemIsConfirmed: boolean;
  ItemIsPartiallyConfirmed: boolean;
  ItemIsReleased: boolean;
  IsCancelled: boolean;
  MRPArea: string;
}

interface ProductionOrderDetailHeader {
  ProductionOrder: number;
  MRPArea: string;
  Product: string;
  ProductName: string;
  OwnerProductionPlantBusinessPartner: string;
  OwnerProductionPlant: string;
  TotalQuantity: number;
  ProductionOrderPlannedStartDate: string;
  ProductionOrderPlannedStartTime: string;
  ProductionOrderPlannedEndDate: string;
  ProductionOrderPlannedEndTime: string;
  HeaderIsConfirmed: boolean;
  HeaderIsPartiallyConfirmed: boolean;
  HeaderIsReleased: boolean;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
}


export type {
  ProductionOrderItem,
  ProductionOrderDetailListItem,
  ProductionOrderDetailHeader,
}
