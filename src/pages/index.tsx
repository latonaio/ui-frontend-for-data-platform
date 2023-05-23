import React from 'react';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <Wrapper className={'Wrapper'}>
      <Header
        title={'データ連携基盤'}
        className={'text-2xl'}
      />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
        ></ContentsTop>
        <div>
          <Link href="/orders/list">オーダーリスト</Link>
        </div>
        <div>
          <Link href="/orders/detail/A3750">オーダー詳細 A3750</Link>
        </div>
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export default Home;
