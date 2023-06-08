import { UIKeyGeneral } from '@/constants';
import { SupplyChainRelationshipBuyerItem, SupplyChainRelationshipSellerItem } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  headerCompleteDeliveryIsDefined: boolean;
  headerDeliveryStatus: string;
  headerDeliveryBlockStatus: boolean;
  // isCancelled: boolean;
  // isMarkedForDeletion: boolean;
  userType: string;
}

export interface ReadsResponse {
  supplyChainRelationshipList: SupplyChainRelationshipBuyerItem[] | SupplyChainRelationshipSellerItem[]
}
