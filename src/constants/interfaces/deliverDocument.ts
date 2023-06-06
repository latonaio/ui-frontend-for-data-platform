interface DeliveryDocumentItem {
  DeliverToPlant: string;
  DeliverToPlantName: string;
  DeliverFromPlant: string;
  DeliverFromPlantName: string;
  DeliverToParty: number;
  DeliverFromParty: number;
  DeliveryDocument: number;
  HeaderDeliveryStatus: string;
  HeaderBillingStatus: string;
  PlannedGoodsReceiptDate?: string;
  PlannedGoodsReceiptTime?: string;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
  SupplyChainRelationshipID: number;
}

type PullDownItem = {
  Plant: string;
  PlantName: string;
  BusinessPartner: number;
  DefaultRelation: boolean;
}

interface DeliveryDocumentListEdit {
  pullDown?: {
    SupplyChains: {
      [key: string]: {
        DeliverToParty: PullDownItem[];
        DeliverFromParty: PullDownItem[];
      };
    };
  };
}

interface DeliveryDocumentListEditForCache {
  SupplyChainRelationshipID: number;
  DeliverToParty: PullDownItem[];
  DeliverFromParty: PullDownItem[];
}

interface DeliverToPartyItem extends DeliveryDocumentItem {
}

interface DeliverFromPartyItem extends DeliveryDocumentItem {
}

interface DeliveryDocumentDetailListItem {
  DeliveryDocument: number;
  DeliveryDocumentItem: number;
  Product: string;
  DeliveryDocumentItemText: string;
  OriginalQuantityInDeliveryUnit: number;
  DeliveryUnit: string;
  ActualGoodsIssueDate: string;
  ActualGoodsIssueTime: string;
  ActualGoodsReceiptDate: string;
  ActualGoodsReceiptTime: string;
  OrdersDetailJumpReq: {
    OrderID: number;
    OrderItem: number;
    Product: string;
  }
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
}

interface DeliveryDocumentDetailHeader {
  DeliverFromParty: number
  DeliverFromPlantName: string
  DeliverToParty: number
  DeliverToPlantName: string
  DeliveryDocument: number
  HeaderBillingStatus: string
  HeaderDeliveryStatus: string
  PlannedGoodsReceiptDate: string
  PlannedGoodsReceiptTime: string
}

export type {
  DeliverToPartyItem,
  DeliverFromPartyItem,
  DeliveryDocumentDetailListItem,
  DeliveryDocumentDetailHeader,
  PullDownItem,
  DeliveryDocumentListEdit,
  DeliveryDocumentListEditForCache,
}
