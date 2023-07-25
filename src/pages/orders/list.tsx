import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { OrdersList as Content } from '@/components/Content';
import {
  AuthedUser,
  BillOfMaterialTablesEnum,
  BuyerItem,
  OrdersTablesEnum,
  SellerItem,
  UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { ordersCache } from '@/services/cacheDatabase/orders';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { cancels, deletes } from '@/api/orders';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/orders/list';

interface PageProps {
}

interface editList {
  [OrdersTablesEnum.ordersListBuyerItem]: TextFieldProps[];
  [OrdersTablesEnum.ordersListSellerItem]: TextFieldProps[];
}

export interface formData {
  [OrdersTablesEnum.ordersListBuyerItem]: BuyerItem[];
  [OrdersTablesEnum.ordersListSellerItem]: SellerItem[];
  editList: editList;
}

const OrdersList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(OrdersTablesEnum.ordersListBuyerItem);
  const [displayData, setDisplayData] = useState(UserTypeEnum.Buyer);

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async () => {
    const list = await ordersCache.getOrdersList();

    appDispatch(initializeUpdate({
      [OrdersTablesEnum.ordersListBuyerItem]:
        list[OrdersTablesEnum.ordersListBuyerItem],
      [OrdersTablesEnum.ordersListSellerItem]:
        list[OrdersTablesEnum.ordersListSellerItem],
    }));
  }

  const initLoadTabData = async () => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage();

    dispatch(setLoading({ isOpen: true }));

    await Promise.all([
      (async () => {
        await ordersCache.updateOrdersList({
          language,
          businessPartner,
          emailAddress,
          userType: toLowerCase(UserTypeEnum.Buyer),
        });
      })(),
      (async () => {
        await ordersCache.updateOrdersList({
          language,
          businessPartner,
          emailAddress,
          userType: toLowerCase(UserTypeEnum.Seller),
        });
      })(),
    ]);

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage();
  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 オーダー一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'オーダー情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [OrdersTablesEnum.ordersListBuyerItem]: UserTypeEnum.Buyer,
              [OrdersTablesEnum.ordersListSellerItem]: UserTypeEnum.Seller,
            }
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
                    await ordersCache.updateOrdersList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.Buyer),
                    });
                  })(),
                  (async () => {
                    await ordersCache.updateOrdersList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.Seller),
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
                await initLoadTabData();
              }}
            />
            描画の実行
          </div>
        </div>
        <Content
          onClickHandler={(toggleDisplayEnum: OrdersTablesEnum) => {
            setSearchTextDescription(toggleDisplayEnum);
            toggleDisplayEnum === OrdersTablesEnum.ordersListBuyerItem ?
              setDisplayData(UserTypeEnum.Buyer) : setDisplayData(UserTypeEnum.Seller);
          }}
        />
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
    }
  }
}

export default OrdersList;
