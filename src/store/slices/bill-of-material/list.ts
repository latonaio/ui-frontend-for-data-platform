import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BillOfMaterialListItem as DefaultBillOfMaterialListItem, BillOfMaterialTablesEnum } from '@/constants';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface BillOfMaterialListItem extends DefaultBillOfMaterialListItem {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]: BillOfMaterialListItem[] | [];
}

const initialState: InitialState = {
  [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]: [],
};

const isEditingObject = {
}

interface editItemParam {
  params: {
    BillOfMaterial: {
      BillOfMaterial: number;
      Item: BillOfMaterialListItem[];
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  index: number;
  item: BillOfMaterialListItem;
  key: string;
}

export const billOfMaterialList = createSlice({
  name: 'billOfMaterialList',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]: DefaultBillOfMaterialListItem[] | [];
    }>) => {
      const errors = (): errors => {
        return Object.keys(isEditingObject).reduce((collection, key) => {
          collection[key] = {
            isError: false,
            message: null,
          }

          return collection;
        }, {} as { [key: string]: { isError: boolean, message: string | null } });
      };

      if (!action.payload[BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]) { return; }

      state[BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem] = action.payload[BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]
        .map((item) => {
          return {
            ...item,
            isEditing: isEditingObject,
            errors: errors()
          }
        });
    },
  }
})

export const {
  initializeUpdate,
} = billOfMaterialList.actions;
