import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { OrdersDetailList as Content } from '@/components/Content';
import { AuthedUser, OrdersDetailHeader, OrdersDetailListItem, OrdersTablesEnum, UserTypeEnum } from '@/constants';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import {
  getSearchTextDescription,
} from '@/helpers/pages';
import { ordersCache } from '@/services/cacheDatabase/orders';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';
import { initializeUpdate } from '@/store/slices/orders/detail-list';
import { useAppDispatch } from '@/store/hooks';

interface PageProps {
  orderId: number;
  userType: string;
}

interface SelectProps {
  currentValue?: any;
  select: {
    data: any[];
    label: string;
    value: string;
  };
}

export interface editList {
  orderItemText: TextFieldProps[];
  orderQuantityInDeliveryUnit: TextFieldProps[];
  deliveryUnit: TextFieldProps[];
  conditionRateValue: TextFieldProps[];
  requestedDeliveryDate: TextFieldProps[];
}

export interface formData {
  paymentTerms: SelectProps;
  paymentMethod: SelectProps;
  transactionCurrency: SelectProps;
  orderDate: {
    currentValue: string,
  }
  quantityUnit: SelectProps;
  editList: editList;
  [OrdersTablesEnum.ordersDetailList]: OrdersDetailListItem[];
}

const OrdersDetailList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (orderId: number, userType: string) => {
    const list = await ordersCache.getOrdersDetailList(orderId, userType);

    appDispatch(initializeUpdate({
      [OrdersTablesEnum.ordersDetailList]: list[OrdersTablesEnum.ordersDetailList],
      [OrdersTablesEnum.ordersDetailHeader]: list [OrdersTablesEnum.ordersDetailHeader] ?
        list[OrdersTablesEnum.ordersDetailHeader] : {},
    }));
  }

  const initLoadTabData = async (orderId: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage(
      orderId,
      userType,
    );

    dispatch(setLoading({ isOpen: true }));

    await ordersCache.updateOrdersDetailList({
      orderId,
      userType,
      buyer: data.userType === toLowerCase(UserTypeEnum.Buyer) ?
        businessPartner : null,
      seller: data.userType === toLowerCase(UserTypeEnum.Seller) ?
        businessPartner : null,
      language,
      businessPartner,
      emailAddress,
    });

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage(
      orderId,
      userType,
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    initLoadTabData(data.orderId, data.userType);
  }, [data]);

  // useEffect(() => {
  //   document.addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     if (!formData?.editList?.orderItemText) { return; }
  //
  //     setFormData({
  //       ...formData,
  //       editList: {
  //         orderItemText: [
  //           ...formData.editList.orderItemText.map((item: any, index: number) => {
  //             return {
  //               isEditing: false,
  //             }
  //           })
  //         ]
  //       }
  //     });
  //   });
  //
  //   return () => {
  //     document.removeEventListener('click', () => {});
  //   }
  // }, []);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 オーダー詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'オーダー情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.Buyer]: [UserTypeEnum.Buyer],
              [UserTypeEnum.Seller]: [UserTypeEnum.Seller],
            },
          )}
        />
        <div style={{
          marginBottom: rem(20),
          textAlign: 'right'
        }}>
          <div
            className={'inline-flex justify-end items-center'}
            style={{
              fontSize: rem(13),
              color: '#48bdd7',
              cursor: 'pointer',
            }}
          >
            <i
              className="icon-retweet"
              style={{
                fontSize: rem(24),
              }}
              onClick={async () => {
                const {
                  language,
                  businessPartner,
                  emailAddress,
                }: AuthedUser = getLocalStorage('auth');

                dispatch(setLoading({ isOpen: true }));

                await Promise.all([
                  (async () => {
                    await ordersCache.updateOrdersDetailList({
                      orderId: data.orderId,
                      userType: data.userType,
                      buyer: data.userType === toLowerCase(UserTypeEnum.Buyer) ?
                        businessPartner : null,
                      seller: data.userType === toLowerCase(UserTypeEnum.Seller) ?
                        businessPartner : null,
                      language,
                      businessPartner,
                      emailAddress,
                    });
                  })(),
                ]);

                dispatch(setLoading({ isOpen: false }));
              }}
            />
            キャッシュの更新の実行
          </div>
          <div
            className={'inline- justify-end items-center'}
            style={{
              fontSize: rem(13),
              cursor: 'pointer',
              color: '#4865d7',
            }}
          >
            <i
              className="icon-refresh"
              style={{
                fontSize: rem(24),
              }}
              onClick={async () => {
                await initLoadTabData(data.orderId, data.userType);
              }}
            />
            描画の実行
          </div>
        </div>

        {/*<div>*/}
        {/*  <i*/}
        {/*    className="icon-refresh"*/}
        {/*    style={{*/}
        {/*      fontSize: rem(32),*/}
        {/*      cursor: 'pointer',*/}
        {/*    }}*/}
        {/*    onClick={async () => {*/}
        {/*      await initLoadTabData(data.orderId, data.userType);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</div>*/}
        <Content
          userType={data.userType}
          orderId={data.orderId}
        />
      </Main>
      <Footer hrefPath={`/orders/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderId, userType } = context.query;

  return {
    props: {
      orderId: Number(orderId),
      userType,
    }
  }
}

export default OrdersDetailList;
