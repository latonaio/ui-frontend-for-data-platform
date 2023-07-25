import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrdersItem as DefaultOrdersListItem, OrdersTablesEnum } from '@/constants';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface OrdersListItem extends DefaultOrdersListItem {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [OrdersTablesEnum.ordersListBuyerItem]: OrdersListItem[] | [];
  [OrdersTablesEnum.ordersListSellerItem]: OrdersListItem[] | [];
}

const initialState: InitialState = {
  [OrdersTablesEnum.ordersListBuyerItem]: [],
  [OrdersTablesEnum.ordersListSellerItem]: [],
};

const isEditingObject = {
}

interface editItemParam {
  params: {
    Orders: {
      Orders: number;
      Item: OrdersListItem[];
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  index: number;
  item: OrdersListItem;
  key: string;
}

export const ordersList = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [OrdersTablesEnum.ordersListBuyerItem]: DefaultOrdersListItem[] | [];
      [OrdersTablesEnum.ordersListSellerItem]: DefaultOrdersListItem[] | [];
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

      if (action.payload[OrdersTablesEnum.ordersListBuyerItem]) {
        state[OrdersTablesEnum.ordersListBuyerItem] =
          action.payload[OrdersTablesEnum.ordersListBuyerItem]
            .map((item) => {
              return {
                ...item,
                isEditing: isEditingObject,
                errors: errors(),
              };
            });
      }

      if (action.payload[OrdersTablesEnum.ordersListSellerItem]) {
        state[OrdersTablesEnum.ordersListSellerItem] =
          action.payload[OrdersTablesEnum.ordersListSellerItem]
            .map((item) => {
              return {
                ...item,
                isEditing: isEditingObject,
                errors: errors(),
              };
            });
      }
    },
  }
})

export const {
  initializeUpdate,
} = ordersList.actions;
