interface ProductionVersionImage {
    BusinessPartnerID: number;
    DocID: string;
    FileExtension: string;
}

interface ProductionVersionListItem {
    Product: string;
    ProductionVersion: number;
    ProductDescription: string;
    OwnerPlant: string;
    BillOfMaterial: number;
    Operations: number;
    IsMarkedForDeletion: boolean;
    OwnerProductionPlantBusinessPartner: number;
    Images: {
        DocID: {};
        ProductionVersion: ProductionVersionImage;
    };
}

export type{
    ProductionVersionListItem,
    ProductionVersionImage,
}
