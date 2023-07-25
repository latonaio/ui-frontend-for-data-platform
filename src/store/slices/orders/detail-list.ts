import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OrdersDetailHeader as DefaultOrdersDetailHeader,
  OrdersDetailListItem as DefaultOrdersDetailListItem,
  OrdersTablesEnum,
} from '@/constants';
import { setLoading } from '@/store/slices/loadging';
import { updates } from '@/api/orders';
import { Dispatch } from 'redux';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { isFloat } from '@/helpers/form';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface OrdersDetailListItem extends DefaultOrdersDetailListItem {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface OrdersDetailHeader extends DefaultOrdersDetailHeader {
}

export interface InitialState {
  [OrdersTablesEnum.ordersDetailList]: OrdersDetailListItem[] | [];
  [OrdersTablesEnum.ordersDetailHeader]: OrdersDetailHeader | {};
}

const initialState: InitialState = {
  [OrdersTablesEnum.ordersDetailList]: [],
  [OrdersTablesEnum.ordersDetailHeader]: {},
};

const isEditingObject = {
  ComponentProductStandardQuantityInBaseUnit: false,
  OrdersItemText: false,
}

interface editItemParam {
  params: {
    Orders: {
      Orders: number;
      Item: OrdersDetailListItem[];
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  index: number;
  item: OrdersDetailListItem;
  key: string;
}

export const ordersDetailList = createSlice({
  name: 'ordersDetailList',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [OrdersTablesEnum.ordersDetailList]: DefaultOrdersDetailListItem[] | [];
      [OrdersTablesEnum.ordersDetailHeader]: DefaultOrdersDetailHeader | {};
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

      if (!action.payload[OrdersTablesEnum.ordersDetailList]) { return; }

      state[OrdersTablesEnum.ordersDetailList] = action.payload[OrdersTablesEnum.ordersDetailList]
        .map((item) => {
          return {
            ...item,
            isEditing: isEditingObject,
            errors: errors()
          }
        });
      state[OrdersTablesEnum.ordersDetailHeader] = action
        .payload[OrdersTablesEnum.ordersDetailHeader];
    },
    pushItemToEdit: (state, action: PayloadAction<pushEditItem>) => {
      const targetState = state[OrdersTablesEnum.ordersDetailList][action.payload.index];
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      state[OrdersTablesEnum.ordersDetailList][action.payload.index] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      index: number;
      item: OrdersDetailListItem;
      key: string;
    }>) => {
      const targetState = state[OrdersTablesEnum.ordersDetailList][action.payload.index];
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];
      state[OrdersTablesEnum.ordersDetailList][action.payload.index] = {
        ...actionData.item,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: OrdersDetailListItem;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;
      state[OrdersTablesEnum.ordersDetailList][action.payload.index] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: OrdersDetailListItem;
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

      state[OrdersTablesEnum.ordersDetailList][action.payload.index] = {
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
                               item: OrdersDetailListItem
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
  [OrdersTablesEnum.ordersDetailHeader]: OrdersDetailHeader,
  [OrdersTablesEnum.ordersDetailList]: OrdersDetailListItem[],
}) => {
  const list  = listState;

  return Object.keys(
    list[OrdersTablesEnum.ordersDetailList][index].errors,
  ).some((key) => {
    return list[OrdersTablesEnum.ordersDetailList][index].errors[key].isError
  })
}

export const editItemAsync = async (
  editItemParam: editItemParam,
  appDispatch: Dispatch,
  listState: {
    [OrdersTablesEnum.ordersDetailHeader]: OrdersDetailHeader,
    [OrdersTablesEnum.ordersDetailList]: OrdersDetailListItem[],
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
      Orders: {
        OrderID: params.Orders.Orders,
        Item: [
          {
            Orders: params.Orders.Orders,
          },
        ],
      },
      accepter: params.accepter,
      api_type: params.api_type,
    }, 'item');

    appDispatch(ordersDetailList.actions.editedItem(
      {
        index: index,
        item: params.Orders.Item[0]  ,
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
} = ordersDetailList.actions;
