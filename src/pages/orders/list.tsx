import React from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { List } from '@/components/Content';

const OrdersList: React.FC = (data: any) => {
  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 オーダー一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop className={'ContentsTopNav'} />
        <List data={data} />
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      orderReceived: [
        {
          orderNumber: 'order-received-xxxxxxxx',
          supplier: 'xxxxxxxx',
          destination: 'xxxxxxxx',
          receivingAndShippingStatus: 'xxxxxxxx',
          invoiceStatus: 'xxxxxxxx',
          deliveryDate: 'xxxxxxxx',
        }
      ],
      order: [
        {
          orderNumber: 'order-xxxxxxxx',
          supplier: 'xxxxxxxx',
          destination: 'xxxxxxxx',
          receivingAndShippingStatus: 'xxxxxxxx',
          invoiceStatus: 'xxxxxxxx',
          deliveryDate: 'xxxxxxxx',
        }
      ]
    }
  }
}

export default OrdersList;
