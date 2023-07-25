import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/styles/global/globals.scss'
import '@/assets/icomoon/style.css';
import { GlobalLoading } from '@/components/Loading';
import { GlobalDialog } from '@/components/Dialog';
import { SnackbarError } from '@/components/Snackbar';
import React from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <GlobalLoading />
      <GlobalDialog />
      <SnackbarProvider maxSnack={3}>
        <SnackbarError isGlobal={true} />
      </SnackbarProvider>
    </Provider>
  )
}
