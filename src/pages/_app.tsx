import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/styles/global/globals.scss'
import '@/assets/icomoon/style.css';
import { GlobalLoading } from '@/components/Loading';
import { GlobalDialog } from '@/components/Dialog';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <GlobalLoading />
      <GlobalDialog />
    </Provider>
  )
}
