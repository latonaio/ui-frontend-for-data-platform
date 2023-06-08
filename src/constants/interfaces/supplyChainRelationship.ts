interface SupplyChainRelationshipItem {
  SupplyChainRelationshipID: number;
  Buyer: number;
  BuyerName: string;
  Seller: number;
  SellerName: string;
  IsMarkedForDeletion: boolean;
}

interface SupplyChainRelationshipBuyerItem extends SupplyChainRelationshipItem {
}

interface SupplyChainRelationshipSellerItem extends SupplyChainRelationshipItem {
}

export type{
  SupplyChainRelationshipItem,
  SupplyChainRelationshipBuyerItem,
  SupplyChainRelationshipSellerItem
}
