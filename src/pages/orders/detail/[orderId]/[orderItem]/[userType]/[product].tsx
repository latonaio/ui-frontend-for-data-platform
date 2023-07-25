import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { OrdersDetail as Content } from '@/components/Content';
import { getLocalStorage, paginationArrow, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  OrdersProductDetailProps,
  UserTypeEnum,
} from '@/constants';
import { ordersCache } from '@/services/cacheDatabase/orders';
import { useDispatch } from 'react-redux';
import { readsPagination } from '@/api/orders/detail';
import { getSearchTextDescription } from '@/helpers/pages';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  orderId: number;
  orderItem: number;
  product: string;
  userType: string;
}

export interface editList {
  state: {
    isEditing: boolean;
  }
}

export interface formData {
  editList: editList;
}

const OrdersDetail = (data: any) => {
  const [displayData, setDisplayData] = useState<Partial<OrdersProductDetailProps>>({});
  const [paginationData, setPaginationData] = useState({});
  const [formData, setFormData] = useState<formData | any>({});

  const dispatch = useDispatch();

  const setFormDataForPage = async (
    orderId: number,
    orderItem: number,
    product: string,
    userType: string,
  ) => {
    const detail = await ordersCache.getOrdersDetail(
      orderId,
      orderItem,
      product
    );

    setFormData({
      editList: {
        detail: {

        }
      }
    });

    if (detail) {
      setDisplayData(detail);
    }
  }

  const initLoadTabData = async (
    orderId: number,
    orderItem: number,
    product: string,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage(
      orderId,
      orderItem,
      product,
      userType,
    );

    dispatch(setLoading({ isOpen: true }));

    const detailResponse = await ordersCache.updateOrdersDetail({
      userType,
      orderId,
      orderItem,
      product,
      language,
      businessPartner,
      emailAddress,
    });

    setDisplayData(detailResponse);

    const paginationResponse = await readsPagination({
      userType,
      orderId,
      orderItem,
      product,
      language,
      businessPartner,
      userId: emailAddress,
    });

    setPaginationData({
      ...paginationArrow(
        paginationResponse.ordersDetailPagination.Paginations,
        orderItem,
        'orders'
      ),
      userType,
    });

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData(
      data.orderId,
      data.orderItem,
      data.product,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 オーダー詳細'} className={'text-2xl'}/>
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'オーダー詳細を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.Buyer]: UserTypeEnum.Buyer,
              [UserTypeEnum.Seller]: UserTypeEnum.Seller,
            }
          )}
        />
        {displayData &&
          <Content
            data={displayData}
            paginationData={paginationData}
          />}
      </Main>
      <Footer hrefPath={`/orders/detail/list/${data.userType}/${data.orderId}`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    orderId,
    orderItem,
    product,
    userType,
  } = context.query;

  return {
    props: {
      productName: '',
      orderId: Number(orderId),
      orderItem: Number(orderItem),
      product,
      userType,
      tags: [],
      allergen: [],
      productInfo: [],
    }
  }
}

export default OrdersDetail;
