import {
  SupplyChainRelationshipItem,
  UIKeyGeneral,
  SupplyChainRelationshipDetailExconfList,
} from '@/constants';

export interface params extends UIKeyGeneral {
  // isMarkedForDeletion: boolean;
  supplyChainRelationshipId: number;
  userType: string;
}

export interface response {
  supplyChainRelationshipDetailExconfListHeader: SupplyChainRelationshipItem;
  supplyChainRelationshipDetailExconfList: SupplyChainRelationshipDetailExconfList;
}
