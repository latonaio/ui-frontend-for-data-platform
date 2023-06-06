import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeliveryDocumentDetailProps } from '@/constants';

interface updateDeliveryDocumentDetailAction {
  path: string;
  data: Partial<DeliveryDocumentDetailProps>;
}

const initialState: {
  [key in string]: Partial<DeliveryDocumentDetailProps>;
} = {};

export const deliveryDocumentDetail = createSlice({
  name: 'details',
  initialState,
  reducers: {
    updateDeliveryDocumentDetailState: (state, action: PayloadAction<updateDeliveryDocumentDetailAction>) => {
      if (!state[action.payload.path]) {
        const detail = JSON.stringify(action.payload);
        const parsedDetail = JSON.parse(detail);
        state[parsedDetail.path] = parsedDetail.data;
      }
    },
    clearDeliveryDocumentDetailState: (state) => {
      state = initialState;
    }
  }
})

export const {
  updateDeliveryDocumentDetailState,
  clearDeliveryDocumentDetailState,
} = deliveryDocumentDetail.actions

export default deliveryDocumentDetail.reducer
