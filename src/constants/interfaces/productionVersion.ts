interface ProductionVersionImage {
    ProductionVersion: number;
    DocID: string;
    FileExtension: string;
}

interface ProductionVersionListItem{
    Product: string;
    ProductionVersion: number;
    ProductDescription: string;
    OwnerPlant: string;
    BillOfMaterial: number;
    IsMarkedForDeletion: boolean;
    OwnerProductionPlantBusinessPartner: number;
    Images: {
        DocID: {};
        Product: ProductionVersionImage;
      };
}

export type{
    ProductionVersionListItem,
    ProductionVersionImage,
}