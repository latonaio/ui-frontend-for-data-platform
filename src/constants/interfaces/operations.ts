interface OperationsItem {
  Operations: number;
  Product: string;
  ProductDescription: string;
  PlantName: string;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
  Images: {
    Operations: OperationsImage;
  };
}

interface OperationsImage {
  BusinessPartnerID: number;
  DocID: string;
  FileExtension: string;
}

export type {
  OperationsItem,
  OperationsImage,
}
