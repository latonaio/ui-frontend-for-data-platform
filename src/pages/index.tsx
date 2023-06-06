import React from 'react';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { GlobalMenu } from '@/components/Navi';

const Home: React.FC = () => {
  return (
    <Wrapper className={'Wrapper'}>
      <Header
        title={'データ連携基盤'}
        className={'text-2xl'}
      />
      <Main className={'Main'}>
        <ContentsTop
          title={''}
          className={'ContentsTopNav'}
          isSearchHidden={true}
          isIconHidden={true}
        ></ContentsTop>
        <GlobalMenu></GlobalMenu>
      </Main>
      <Footer isHidden={true}></Footer>
    </Wrapper>
  )
}

export default Home;
