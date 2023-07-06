import {
  SupplyChainRelationshipItem,
  UIKeyGeneral,
  SupplyChainRelationshipDetailList,
} from '@/constants';

export interface params extends UIKeyGeneral {
  supplyChainRelationshipId: number;
  userType: string;
}

export interface response {
  supplyChainRelationshipDetailHeader: SupplyChainRelationshipItem;
  supplyChainRelationshipContents: SupplyChainRelationshipDetailList;
}
