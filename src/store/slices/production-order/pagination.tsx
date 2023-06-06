import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductionOrderDetailProps } from '@/constants';

interface paginationState {
  ProductionOrder: number;
  ProductionOrderItem: number;
  Product: string;
}

interface paginationAction {
  path: string;
  data: paginationState[];
}

const initialState: {
  [key: string]: paginationState[];
} = {};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<paginationAction>) => {
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

export const { setPagination } = paginationSlice.actions

export default paginationSlice.reducer
