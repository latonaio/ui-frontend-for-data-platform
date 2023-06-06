import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductionOrderDetailProps } from '@/constants';

interface updateProductionOrderDetailAction {
  path: string;
  data: Partial<ProductionOrderDetailProps>;
}

const initialState: {
  [key in string]: Partial<ProductionOrderDetailProps>;
} = {};

export const productionOrderDetail = createSlice({
  name: 'details',
  initialState,
  reducers: {
    updateProductionOrderDetailState: (state, action: PayloadAction<updateProductionOrderDetailAction>) => {
      if (!state[action.payload.path]) {
        const detail = JSON.stringify(action.payload);
        const parsedDetail = JSON.parse(detail);
        state[parsedDetail.path] = parsedDetail.data;
      }
    },
    clearProductionOrderDetailState: (state) => {
      state = initialState;
    }
  }
})

export const {
  updateProductionOrderDetailState,
  clearProductionOrderDetailState,
} = productionOrderDetail.actions

export default productionOrderDetail.reducer
