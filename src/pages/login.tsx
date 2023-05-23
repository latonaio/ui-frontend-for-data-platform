import React from "react";
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { LoginForm } from '@/components/LoginForm';
import styles from '@/styles/pages/Login.module.scss'

const Login: React.FC = () => {
  return (
    <Wrapper className={`Wrapper ${styles.main}`}>
      <Main className={'Main h-screen dis-flex items-center'}>
        <LoginForm></LoginForm>
      </Main>
    </Wrapper>
  )
}

export default Login;
