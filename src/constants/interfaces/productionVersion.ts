interface ProductionVersionImage {
    BusinessPartnerID: number;
    DocID: string;
    FileExtension: string;
}

interface ProductionVersionListItem {
    Product: string;
    ProductionVersion: number;
    ProductDescription: string;
    OwnerPlantName: string;
    BillOfMaterial: number;
    Operations: number;
    IsMarkedForDeletion: boolean;
    OwnerProductionPlantBusinessPartner: number;
    Images: {
        DocID: {};
        ProductionVersion: ProductionVersionImage;
    };
}
interface ProductionVersionDetailListItem{
	ProductionVersion: number;
	ProductionVersionItem: number;
	Product: string;
	ProductDescription: string;
	OperationsText: string;
	Plant: string;
	PlantName: string;
	BillOfMaterial: number;
	Operations: number;
	ValidityStartDate: string;
	IsMarkedForDeletion: boolean;
}
interface ProductionVersionDetailListHeader{
	ProductionVersion: number;
	ProductionVersionItem: number;
	Product: string;
	ProductDescription: string;
	OperationsText: string;
	OwnerPlantName: string;
	BillOfMaterial: number;
	Operations: number;
	ValidityStartDate: string;
	IsMarkedForDeletion: boolean;
	Images: {
        DocID: {};
        ProductionVersion: ProductionVersionImage;
    };
}

export type{
    ProductionVersionListItem,
    ProductionVersionImage,
	ProductionVersionDetailListItem,
	ProductionVersionDetailListHeader
}
