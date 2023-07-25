import { Accepter, BillOfMaterialDetailListItem } from '@/constants';
import { number } from 'yup';

export interface DeleteParams extends Accepter {
  BillOfMaterial: {
    BillOfMaterial: number;
    IsMarkedForDeletion: boolean;
  }
}

export interface UpdateParams extends Accepter {
  BillOfMaterial: {
    BillOfMaterial: number;
    Item: {
      BillOfMaterial: number;
      BillOfMaterialItem: number;
      ComponentProduct: string;
      BillOfMaterialItemText: string;
      StockConfirmationPlantName: string;
      StockConfirmationPlant: string;
      ComponentProductStandardQuantityInBaseUnit: number;
      ComponentProductBaseUnit: string;
      ValidityStartDate: string;
      IsMarkedForDeletion: boolean;
    }[];
  }
}

