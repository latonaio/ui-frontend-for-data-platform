import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { DeliveryDocumentDetailList as Content } from '@/components/Content';
import {
  AuthedUser,
  DeliveryDocumentDetailListItem,
  DeliveryDocumentTablesEnum, UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import { deliveryDocumentCache } from '@/services/cacheDatabase/deliveryDocument';
import { setLoading } from '@/store/slices/loadging';
import { cancels, deletes } from '@/api/deliveryDocument';
import { useDispatch } from 'react-redux';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { rem } from 'polished';

interface PageProps {
  deliveryDocument: number;
  userType: string;
}

export type onUpdateItem =(
  value: any,
  index: number,
  itemType: string,
  params: any,
  aptType?: string,
) => void;

export interface formData {
  editList: any;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetailList]: DeliveryDocumentDetailListItem[];
}

const DeliveryDocumentList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData>({
    editList: {},
    [DeliveryDocumentTablesEnum.deliveryDocumentDetailList]: [],
  });

  const dispatch = useDispatch();

  const setFormDataForPage = async (deliveryDocument: number, userType: string) => {
    const list = await deliveryDocumentCache.getDeliveryDocumentDetailList(deliveryDocument, userType);

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list.deliveryDocumentDetailList,
          [
            { keyName: 'isCancelled' },
            { keyName: 'isMarkedForDeletion' },
          ]
        ),
      },
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailList]: list.deliveryDocumentDetailList || [],
    });

    setDisplayData({
      userType,
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailList]: list.deliveryDocumentDetailList || [],
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailHeader]: list.deliveryDocumentDetailHeader || {},
    });
  };

  const initLoadTabData = async (deliveryDocument: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage(
      deliveryDocument,
      userType,
    );

    dispatch(setLoading({ isOpen: true }));

    await deliveryDocumentCache.updateDeliveryDocumentDetailList({
      deliveryDocument,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage(
      deliveryDocument,
      userType,
    );
  };

  const onUpdateItem = async (
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
    }

    deliveryDocumentCache.updateDeliveryDocumentDetailList({
      deliveryDocument: data.deliveryDocument,
      userType: data.userType,
      language,
      businessPartner,
      emailAddress,
    });

    deliveryDocumentCache.updateDeliveryDocumentList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.DeliverToParty),
    });

    deliveryDocumentCache.updateDeliveryDocumentList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.DeliverFromParty),
    });

    const paramsItem = params.DeliveryDocument.Item[0].DeliveryDocumentItem;

    const editListKeyName = updateItemKey.replace(/^./g, (g) => g[0].toLowerCase());

    const updateData = {
      ...formData,
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailList]: [
        ...formData[DeliveryDocumentTablesEnum.deliveryDocumentDetailList].map((item: any, index: number) => {
          if (item.DeliveryDocumentItem === paramsItem) {
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

  useEffect(() => {
    initLoadTabData(data.deliveryDocument, data.userType);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 入出荷詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'入出荷詳細を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.DeliverToParty]: [UserTypeEnum.DeliverToParty],
              [UserTypeEnum.DeliverFromParty]: [UserTypeEnum.DeliverFromParty],
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
                    await deliveryDocumentCache.updateDeliveryDocumentList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.DeliverToParty),
                    });
                  })(),
                  (async () => {
                    await deliveryDocumentCache.updateDeliveryDocumentList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.DeliverFromParty),
                    });
                  })(),
                  (async () => {
                    await deliveryDocumentCache.updateDeliveryDocumentDetailList({
                      deliveryDocument: data.deliveryDocument,
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
                await initLoadTabData(data.deliveryDocument, data.userType);
              }}
            />
            描画の実行
          </div>
        </div>
        {displayData && formData &&
          <Content
            data={displayData}
            formData={formData}
            userType={data.userType}
            deliveryDocument={data.deliveryDocument}
            onUpdateItem={onUpdateItem}
          />}
      </Main>
      <Footer hrefPath={`/delivery-document/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { deliveryDocument, userType } = context.query;

  return {
    props: {
      deliveryDocument: Number(deliveryDocument),
      userType,
    }
  }
}

export default DeliveryDocumentList;
