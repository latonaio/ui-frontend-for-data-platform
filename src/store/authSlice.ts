import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setLocalStorage } from '@/helpers/common';

export interface AuthState {
  emailAddress: string;
  businessPartner: number | null;
  businessPartnerName: string;
  businessUserFirstName: string;
  businessUserLastName: string;
  businessUserFullName: string;
  language: string;
}

const initialState: AuthState = {
  emailAddress: '',
  businessPartner: null,
  businessPartnerName: '',
  businessUserFirstName: '',
  businessUserLastName: '',
  businessUserFullName: '',
  language: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.emailAddress = action.payload.emailAddress;
      state.businessPartner = action.payload.businessPartner;
      state.businessPartnerName = action.payload.businessPartnerName;
      state.businessUserFirstName = action.payload.businessUserFirstName;
      state.businessUserLastName = action.payload.businessUserLastName;
      state.businessUserFullName = action.payload.businessUserFullName;
      state.language = action.payload.language;

      setLocalStorage('auth', JSON.stringify(state));
    }
  }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer
