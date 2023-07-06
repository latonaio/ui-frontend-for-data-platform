import { ProductImage } from '@/constants';

interface SupplyChainRelationshipDetailItem {
  Content: string;
  Param: unknown[];
}

interface SupplyChainRelationshipExconfListItem {
  Content: string;
  Exist: boolean;
  Param: unknown[];
}

interface SupplyChainRelationshipDetailExconfList {
  SupplyChainRelationshipID: number;
  Existences: SupplyChainRelationshipExconfListItem[];
}

interface SupplyChainRelationshipDetailList {
  SupplyChainRelationshipID: number;
  Contents: SupplyChainRelationshipDetailItem[];
}

interface SupplyChainRelationshipDetailExconfListHeader extends SupplyChainRelationshipItem {
}

interface SupplyChainRelationshipDetailHeader extends SupplyChainRelationshipItem {
}

interface SupplyChainRelationshipItem {
  SupplyChainRelationshipID: number;
  Buyer: number;
  BuyerName: string;
  Seller: number;
  SellerName: string;
  Images: {
    Product: ProductImage;
  };
  IsMarkedForDeletion: boolean;
}

interface SupplyChainRelationshipContentListItem extends SupplyChainRelationshipItem {
	SupplyChainRelationshipDeliveryID: number;
	DeliverToParty: number;
	DeliverFromParty: number;
	SupplyChainRelationshipDeliveryPlantID: number;
	DeliverToPlant: string;
	DeliverFromPlant: string;
	SupplyChainRelationshipBillingID: number;
	BlllToParty: number;
	BillFromParty: number;
	SupplyChainRelationshipPaymentID: number;
	Payer: number;
	Payee: number;
}
interface SupplyChainRelationshipBuyerItem extends SupplyChainRelationshipItem {
}

interface SupplyChainRelationshipSellerItem extends SupplyChainRelationshipItem {
}

export type{
  SupplyChainRelationshipItem,
  SupplyChainRelationshipDetailExconfListHeader,
  SupplyChainRelationshipDetailExconfList,
  SupplyChainRelationshipBuyerItem,
  SupplyChainRelationshipSellerItem,
  SupplyChainRelationshipContentListItem,
  SupplyChainRelationshipDetailItem,
  SupplyChainRelationshipDetailHeader,
  SupplyChainRelationshipDetailList,
}
