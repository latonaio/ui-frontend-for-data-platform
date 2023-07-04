import { number } from 'yup';
import { ProductImage } from './product';

interface BillOfMaterialImage extends ProductImage {}

interface BillOfMaterialListItem {
	Product: string;
	BillOfMaterial: number;
	ProductDescription: string;
	OwnerProductionPlant: string;
	OwnerProductionPlantName: string;
	ValidityStartDate: string;
	IsMarkedForDeletion: boolean;
	Images: {
		Product: BillOfMaterialImage;
	};
}

interface BillOfMaterialDetailHeader extends BillOfMaterialListItem {
	Product: string;
	BillOfMaterial: number;
	ProductDescription: string;
	OwnerProductionPlant: string;
	OwnerProductionPlantName: string;
	ValidityStartDate: string;
	IsMarkedForDeletion: boolean;
	Images: {
		Product: ProductImage;
	}
}

interface BillOfMaterialDetailListItem extends BillOfMaterialListItem {
	BillOfMaterialItem: number;
	ComponentProduct: string;
	BillOfMaterialItemText: string;
	StockConfirmationPlantName: string;
	StockConfirmationPlant: string;
	ComponentProductStandardQuantityInBaseUnuit: number;
	ComponentProductBaseUnit: string;
	ValidityStartDate: string;
	IsMarkedForDeletion: boolean;
}

export type {
  BillOfMaterialListItem,
	BillOfMaterialDetailHeader,
	BillOfMaterialDetailListItem,
}
