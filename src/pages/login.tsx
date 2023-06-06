import React from "react";
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { LoginForm } from '@/components/LoginForm';
import styles from '@/styles/pages/Login.module.scss'
import { Header } from '@/components/Header';

const Login: React.FC = () => {
  return (
    <Wrapper className={`Wrapper`}>
      <Header title={'AION™ ログイン'} className={'text-2xl'} />
      <Main className={'Main h-screen dis-flex items-center'}>
        <LoginForm></LoginForm>
      </Main>
    </Wrapper>
  )
}

export default Login;
