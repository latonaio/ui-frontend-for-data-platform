import { ProductImage } from './product';

interface BillOfMaterialImage extends ProductImage {}

interface BillOfMaterialListItem {
	Product: string;
	BillOfMaterial: number;
	ProductDescription: string;
	OwnerPlant: string;
	OwnerPlantName: string;
	IsMarkedForDeletion: boolean;
	ValidityStartDate: string;
	Images: {
		Product: BillOfMaterialImage;
	};
}

export type {
  BillOfMaterialListItem,
}
