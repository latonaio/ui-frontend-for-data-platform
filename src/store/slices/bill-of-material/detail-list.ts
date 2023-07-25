import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BillOfMaterialDetailHeader as DefaultBillOfMaterialDetailHeader,
  BillOfMaterialDetailListItem as DefaultBillOfMaterialDetailListItem,
  BillOfMaterialTablesEnum,
} from '@/constants';
import { setLoading } from '@/store/slices/loadging';
import { updates } from '@/api/billOfMaterial';
import { Dispatch } from 'redux';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { isFloat } from '@/helpers/form';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface BillOfMaterialDetailListItem extends DefaultBillOfMaterialDetailListItem {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface BillOfMaterialDetailHeader extends DefaultBillOfMaterialDetailHeader {
}

export interface InitialState {
  [BillOfMaterialTablesEnum.billOfMaterialDetailList]: BillOfMaterialDetailListItem[] | [];
  [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: BillOfMaterialDetailHeader | {};
}

const initialState: InitialState = {
  [BillOfMaterialTablesEnum.billOfMaterialDetailList]: [],
  [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: {},
};

const isEditingObject = {
  ComponentProductStandardQuantityInBaseUnit: false,
  BillOfMaterialItemText: false,
}

interface editItemParam {
  params: {
    BillOfMaterial: {
      BillOfMaterial: number;
      Item: BillOfMaterialDetailListItem[];
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  index: number;
  item: BillOfMaterialDetailListItem;
  key: string;
}

export const billOfMaterialDetailList = createSlice({
  name: 'billOfMaterialDetailList',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [BillOfMaterialTablesEnum.billOfMaterialDetailList]: DefaultBillOfMaterialDetailListItem[] | [];
      [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: DefaultBillOfMaterialDetailHeader | {};
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

      if (!action.payload[BillOfMaterialTablesEnum.billOfMaterialDetailList]) { return; }

      state[BillOfMaterialTablesEnum.billOfMaterialDetailList] = action.payload[BillOfMaterialTablesEnum.billOfMaterialDetailList]
        .map((item) => {
          return {
            ...item,
            isEditing: isEditingObject,
            errors: errors()
          }
        });
      state[BillOfMaterialTablesEnum.billOfMaterialDetailHeader] = action
        .payload[BillOfMaterialTablesEnum.billOfMaterialDetailHeader];
    },
    pushItemToEdit: (state, action: PayloadAction<pushEditItem>) => {
      const targetState = state[BillOfMaterialTablesEnum.billOfMaterialDetailList][action.payload.index];
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      state[BillOfMaterialTablesEnum.billOfMaterialDetailList][action.payload.index] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      index: number;
      item: BillOfMaterialDetailListItem;
      key: string;
    }>) => {
      const targetState = state[BillOfMaterialTablesEnum.billOfMaterialDetailList][action.payload.index];
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];
      state[BillOfMaterialTablesEnum.billOfMaterialDetailList][action.payload.index] = {
        ...actionData.item,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: BillOfMaterialDetailListItem;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;
      state[BillOfMaterialTablesEnum.billOfMaterialDetailList][action.payload.index] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: BillOfMaterialDetailListItem;
      key: string;
      isError: boolean;
      message: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.errors[actionData.key].isError = actionData.isError;
      actionData.item.errors[actionData.key].message = actionData.message;

      state[BillOfMaterialTablesEnum.billOfMaterialDetailList][action.payload.index] = {
        ...actionData.item,
      }
    },
  }
})

export const checkInvalid = ({
                               index,
                               item,
                               key,
                               checkValue,
                             }: {
                               index: number
                               item: BillOfMaterialDetailListItem
                               key: string
                               checkValue: any,
                             },
                             appDispatch: Dispatch,
) => {
  if (key === 'ComponentProductStandardQuantityInBaseUnit') {
    if (!isFloat(checkValue)) {
      return appDispatch(setErrorItem({
        index: index,
        item: item,
        key: 'ComponentProductStandardQuantityInBaseUnit',
        isError: true,
        message: '小数点以外は無効です',
      }));
    }

    return appDispatch(setErrorItem({
      index: index,
      item: item,
      key: 'ComponentProductStandardQuantityInBaseUnit',
      isError: false,
      message: '',
    }));
  }
};

const isError = (index: number, listState: {
  [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: BillOfMaterialDetailHeader,
  [BillOfMaterialTablesEnum.billOfMaterialDetailList]: BillOfMaterialDetailListItem[],
}) => {
  const list  = listState;

  return Object.keys(
    list[BillOfMaterialTablesEnum.billOfMaterialDetailList][index].errors,
  ).some((key) => {
    return list[BillOfMaterialTablesEnum.billOfMaterialDetailList][index].errors[key].isError
  })
}

export const editItemAsync = async (
  editItemParam: editItemParam,
  appDispatch: Dispatch,
  listState: {
    [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: BillOfMaterialDetailHeader,
    [BillOfMaterialTablesEnum.billOfMaterialDetailList]: BillOfMaterialDetailListItem[],
  },
) => {
  appDispatch(setLoading({ isOpen: true }))

  const params = editItemParam.params;
  const index = editItemParam.index;
  const key = editItemParam.key;

  try {
    if (isError(index, listState)) {
      appDispatch(setGlobalSnackbar({
        message: `無効の値です。`,
      }));
      throw new Error();
    }

    await updates({
      BillOfMaterial: {
        BillOfMaterial: params.BillOfMaterial.BillOfMaterial,
        Item: [
          {
            BillOfMaterial: params.BillOfMaterial.BillOfMaterial,
            BillOfMaterialItem: params.BillOfMaterial.Item[0].BillOfMaterialItem,
            ComponentProduct: params.BillOfMaterial.Item[0].ComponentProduct,
            BillOfMaterialItemText: params.BillOfMaterial.Item[0].BillOfMaterialItemText,
            StockConfirmationPlantName: params.BillOfMaterial.Item[0].StockConfirmationPlantName,
            StockConfirmationPlant: params.BillOfMaterial.Item[0].StockConfirmationPlant,
            ComponentProductStandardQuantityInBaseUnit: params.BillOfMaterial.Item[0].ComponentProductStandardQuantityInBaseUnit,
            ComponentProductBaseUnit: params.BillOfMaterial.Item[0].ComponentProductBaseUnit,
            ValidityStartDate: params.BillOfMaterial.Item[0].ValidityStartDate,
            IsMarkedForDeletion: params.BillOfMaterial.Item[0].IsMarkedForDeletion,
          },
        ],
      },
      accepter: params.accepter,
      api_type: params.api_type,
    }, 'item');

    appDispatch(billOfMaterialDetailList.actions.editedItem(
      {
        index: index,
        item: params.BillOfMaterial.Item[0]  ,
        key: key,
      },
    ));
  } catch (error) {
    // エラー時の処理を行う場合はここに書く

  }

  appDispatch(setLoading({ isOpen: false }))
};

export const {
  initializeUpdate,
  pushItemToEdit,
  editedItem,
  closeItem,
  setErrorItem,
} = billOfMaterialDetailList.actions;
