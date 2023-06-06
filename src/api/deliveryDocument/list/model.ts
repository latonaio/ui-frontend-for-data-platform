import {
  DeliverToPartyItem,
  DeliverFromPartyItem,
  UIKeyGeneral,
  DeliveryDocumentListEdit,
} from '@/constants';

export interface ReadsListParams extends UIKeyGeneral {
  // headerCompleteDeliveryIsDefined: boolean;
  // headerDeliveryStatus: boolean;
  // headerBillingStatus: boolean;
  // headerDeliveryBlockStatus: boolean;
  // headerIssuingBlockStatus: boolean;
  // headerReceivingBlockStatus: boolean;
  // headerBillingBlockStatus: boolean;
  headerBillingStatusException: string;
  // isCancelled: boolean;
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface ReadsListResponse {
  deliveryDocumentListEdit: DeliveryDocumentListEdit;
  deliveryDocuments: DeliverToPartyItem[] | DeliverFromPartyItem[];
}
