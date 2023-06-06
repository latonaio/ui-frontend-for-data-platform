import { Accepter, AuthedUser, DeliverToPartyItem, DeliverFromPartyItem } from '@/constants';

export interface ReadDeliveryDocumentParams extends Accepter {
  DeliveryDocument: {
    DeliverToParty?: number;
    DeliverFromParty?: number;
  }
}

export interface ReadDeliveryDocumentResponse extends Accepter {
  DeliverToItems: DeliverToPartyItem[];
  DeliverFromItems: DeliverFromPartyItem[];
}

export interface UpdateDeliveryDocumentParams extends Accepter {
  DeliveryDocument: {
    DeliveryDocument: number;
    PlannedGoodsReceiptDate?: string;
  }
}

export interface CancelParams extends Accepter {
  DeliveryDocument: {
    DeliveryDocument: number;
    IsCancelled: boolean;
  }
}
