import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isOpen: boolean;
}

const initialState: LoadingState = {
  isOpen: false,
};

export const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      state.isOpen = action.payload.isOpen;
    }
  }
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
