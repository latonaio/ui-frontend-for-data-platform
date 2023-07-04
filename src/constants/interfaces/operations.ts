import { ProductImage } from './product';

interface OperationsImage extends ProductImage {
}

interface OperationsItem {
  Operations: string;
  Product: string;
  ProductDescription: string;
  OwnerProductionPlantName: string;
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
  Images: {
    Operations: OperationsImage;
  };
  OwnerProductionPlantBusinessPartner: number;
  OwnerProductionPlant: number;
}

interface OperationsDetailListItem {
  Operations: number;
  OperationsItem: number;
  OperationsText: string;
  ProductionPlantName: string;
  StandardLotSizeQuantity: string;
  OperationsUnit: string,
  ValidityStartDate: string;
  IsMarkedForDeletion: boolean;
  OwnerProductionPlantBusinessPartner: number;
  OwnerProductionPlant: number;
}

interface OperationsDetailHeader {
  Operations: number;
  Product: string;
  OwnerBusinessPartner: number;
  OwnerPlant: string;
  OperationsText: string;
  OperationsStatus: string;
  ResponsiblePlannerGroup: string;
  ValidityStartDate: string;
  ValidityEndDate: string;
  CreationDate: string;
  LastChangeDate: string;
  PlainLongText: string;
  IsMarkedForDeletion: boolean;
}

export type {
  OperationsDetailListItem,
  OperationsDetailHeader,
  OperationsItem,
};





