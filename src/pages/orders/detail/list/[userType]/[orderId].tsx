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
import { AuthedUser, OrdersDetailListItem, OrdersTablesEnum, UserTypeEnum } from '@/constants';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import {
  createFormDataForSelectObject,
  createFormDataForEditingArray,
  createEditFormData,
  getSearchTextDescription,
} from '@/helpers/pages';
import { ordersCache } from '@/services/cacheDatabase/orders';
import { cancels, updates, deletes } from '@/api/orders';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';

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
  const [formData, setFormData] = useState<formData | any>({});

  const setFormDataForPage = async (orderId: number, userType: string) => {
    const list = await ordersCache.getOrdersDetailList(orderId, userType);

    setFormData({
      ...createFormDataForSelectObject([
        {
          keyName: 'paymentTerms',
          keyType: 'select',
          currentValue: list.ordersDetailHeader?.PaymentTerms,
          select: {
            data: list.ordersDetailHeader?.PaymentTermsList,
            label: 'PaymentTermsName',
            value: 'PaymentTerms',
          }
        },
        {
          keyName: 'paymentMethod',
          keyType: 'select',
          currentValue: list.ordersDetailHeader?.PaymentMethod,
          select: {
            data: list.ordersDetailHeader?.PaymentMethodList,
            label: 'PaymentMethodName',
            value: 'PaymentMethod',
          }
        },
        {
          keyName: 'transactionCurrency',
          keyType: 'select',
          currentValue: list.ordersDetailHeader?.TransactionCurrency,
          select: {
            data: list.ordersDetailHeader?.CurrencyList,
            label: 'CurrencyName',
            value: 'Currency',
          }
        },
        {
          keyName: 'orderDate',
          keyType: 'datePicker',
          currentValue: list.ordersDetailHeader?.OrderDate,
        },
        {
          keyName: 'quantityUnit',
          keyType: 'select',
          select: {
            data: list.ordersDetailHeader?.QuantityUnitList,
            label: 'QuantityUnitName',
            value: 'QuantityUnit',
          }
        },
      ]),
      editList: {
        ...createFormDataForEditingArray(
          list.ordersDetailList,
          [
            { keyName: 'orderItemText' },
            { keyName: 'orderQuantityInDeliveryUnit' },
            { keyName: 'deliveryUnit', valueName: 'OrderDeliveryUnit' },
            { keyName: 'conditionRateValue' },
            { keyName: 'requestedDeliveryDate' },
            { keyName: 'isCancelled' },
            { keyName: 'isMarkedForDeletion' },
          ]
        ),
      },
      [OrdersTablesEnum.ordersDetailList]: list.ordersDetailList || [],
    });

    setDisplayData({
      userType,
      [OrdersTablesEnum.ordersDetailList]: list.ordersDetailList || [],
      [OrdersTablesEnum.ordersDetailHeader]: list.ordersDetailHeader || {},
    });
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
      (async () => {

      })(),
    ]);

    await ordersCache.updateOrdersDetailList({
      orderId,
      userType,
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

  const onUpdateOrderHeader = async (
    value: any,
    updateHeaderKeyName: string,
    params: any,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    const accepter = (params: any) => {
      if (!params.hasOwnProperty('accepter')) {
        return {
          ...params,
          accepter: ['Header'],
        };
      }

      return params;
    }

    await updates({
      ...params,
      accepter: accepter(params).accepter,
    });

    ordersCache.updateOrdersList({
      language,
      businessPartner,
      emailAddress,
      userType: data.userType,
    });

    setFormData({
      ...formData,
      [updateHeaderKeyName]: {
        ...formData[updateHeaderKeyName],
        currentValue: value,
      }
    });

    dispatch(setLoading({ isOpen: false }));
  }

  const onUpdateOrderItem = async (
    value: any,
    updateItemIndex: number,
    updateItemKey: string,
    params: any,
    apiType: string = 'update',
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    const accepter = (params: any) => {
      if (!params.hasOwnProperty('accepter')) {
        return {
          ...params,
          accepter: ['Item'],
        };
      }

      return params;
    }

    if (apiType === 'cancel' || apiType === 'delete') {
      if (apiType === 'cancel') {
        await cancels({
          ...params,
          business_partner: businessPartner,
          accepter: accepter(params).accepter,
        });
      }

      if (apiType === 'delete') {
        await deletes({
          ...params,
          business_partner: businessPartner,
          accepter: accepter(params).accepter,
        });
      }
    } else {
      await updates({
        ...params,
        accepter: accepter(params).accepter,
      });
    }

    ordersCache.updateOrdersDetailList({
      orderId: data.orderId,
      userType: data.userType,
      language,
      businessPartner,
      emailAddress,
    });

    ordersCache.updateOrdersList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.Buyer),
    });

    ordersCache.updateOrdersList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.Seller),
    });

    const orderItem = params.Orders.Item[0].OrderItem;

    const editListKeyName = updateItemKey.replace(/^./g, (g) => g[0].toLowerCase());

    const updateData = {
      ...formData,
      [OrdersTablesEnum.ordersDetailList]: [
        ...formData[OrdersTablesEnum.ordersDetailList].map((item: any, index: number) => {
          if (item.OrderItem === orderItem) {
            return {
              ...item,
              [updateItemKey]: value,
            }
          }
          return { ...item }
        })
      ],
      editList: {
        ...formData.editList,
        [editListKeyName]: [
          ...formData.editList[editListKeyName].map((item: any, index: number) => {
            return {
              isEditing: index === updateItemIndex ? !item.isEditing : item.isEditing,
            };
          })
        ]
      }
    };

    setFormData(updateData);

    dispatch(setLoading({ isOpen: false }));
  }

  const setEditList = (
    editListIndex: number,
    editListKey: string,
    isClose: boolean = false,
  ) => {
    createEditFormData(
      formData,
      setFormData,
      editListIndex,
      editListKey,
      isClose,
    );
  }

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
                  (async () => {
                    await ordersCache.updateOrdersDetailList({
                      orderId: data.orderId,
                      userType: data.userType,
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
        {displayData && formData &&
          <Content
            data={displayData}
            formData={formData}
            userType={data.userType}
            orderId={data.orderId}
            onUpdateOrderHeader={onUpdateOrderHeader}
            onUpdateOrderItem={onUpdateOrderItem}
            setEditList={setEditList}
          />}
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
