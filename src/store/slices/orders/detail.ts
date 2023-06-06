import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrdersProductDetailProps } from '@/constants';

interface updateOrdersDetailAction {
  path: string;
  data: Partial<OrdersProductDetailProps>;
}

const initialState: {
  [key in string]: Partial<OrdersProductDetailProps>;
} = {};

export const ordersDetail = createSlice({
  name: 'details',
  initialState,
  reducers: {
    updateOrdersDetailState: (state, action: PayloadAction<updateOrdersDetailAction>) => {
      if (!state[action.payload.path]) {
        const detail = JSON.stringify(action.payload);
        const parsedDetail = JSON.parse(detail);
        state[parsedDetail.path] = parsedDetail.data;
      }
    },
    clearState: (state) => {
      state = initialState;
    }
  }
})

export const {
  updateOrdersDetailState,
  clearState,
} = ordersDetail.actions

export default ordersDetail.reducer
