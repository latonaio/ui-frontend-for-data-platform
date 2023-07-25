import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

interface SnackbarState {
  message: string;
}

const initialState: SnackbarState = {
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbarSlice',
  initialState,
  reducers: {
    setGlobalSnackbar: (state, action: PayloadAction<{
      message: string;
    }>) => {
      // state.messages.push(action.payload.message);
      state.message = action.payload.message;

      console.log(action.payload)

      // const { enqueueSnackbar } = useSnackbar();

      // enqueueSnackbar('I love snacks.');
    },
    clearMessage: (state, action) => {
      state.message = '';
    }
  }
})

export const {
  setGlobalSnackbar,
  clearMessage,
} = snackbarSlice.actions

export default snackbarSlice.reducer
