import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

interface dialog {
  isOpen: boolean;
  title?: string;
  message?: string;
}

interface consent extends dialog {
  allow?: () => void;
  disallow?: () => void;
  children?: ReactNode | null;
}

export interface dialogState {
  type: 'consent' | null;
  consent: consent;
}

const initialState: dialogState = {
  type: null,
  consent: {
    isOpen: false,
    title: '',
    message: '',
    allow: () => null,
    disallow: () => null,
    children: null,
  }
};

export const dialogSlice = createSlice({
  name: 'dialogSlice',
  initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<dialogState>) => {
      const { type, consent } = action.payload;

      if (type) {
        state.type = type;
      }

      state.consent = { ...state.consent, ...consent };
    }
  }
})

export const { setDialog } = dialogSlice.actions

export default dialogSlice.reducer
