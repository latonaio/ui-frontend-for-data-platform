import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { DeliveryDocumentList as Content } from '@/components/Content';
import {
  AuthedUser, DeliverFromPartyItem,
  DeliverToPartyItem, DeliveryDocumentListEditForCache,
  DeliveryDocumentTablesEnum,
  OrdersTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { deliveryDocumentCache } from '@/services/cacheDatabase/deliveryDocument';
import {
  createFormDataForSelectObject,
  createEditFormData,
  createFormDataForEditingArray,
  createFormDataForKeyNameEditingArray,
  getSearchTextDescription,
} from '@/helpers/pages';
import { setLoading } from '@/store/slices/loadging';
import { cancels, updates, deletes } from '@/api/deliveryDocument';
import { useDispatch } from 'react-redux';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';
import { ordersCache } from '@/services/cacheDatabase/orders';

interface PageProps {
}

export type onUpdateItem = (
  value: any,
  index: number,
  itemType: string,
  params: any,
  listType: string,
  apiType?: string,
) => void;

export interface editList {
  pullDowns: any;
  [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: any;
  [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: any;
}

export interface formData {
  [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: DeliverToPartyItem[];
  [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: DeliverFromPartyItem[];
  editList: editList;
}

const DeliveryDocumentList: React.FC<PageProps> = (data ) => {
  const [searchTextDescription, setSearchTextDescription] = useState(DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem);
  const [formData, setFormData] = useState<formData | any>({});
  const [displayData, setDisplayData] = useState(UserTypeEnum.DeliverToParty);

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await deliveryDocumentCache.getDeliveryDocumentList();

    setFormData({
      editList: {
        pullDowns: {
          [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem]: list[DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem]
            .reduce((collection: any, item: DeliveryDocumentListEditForCache) => {
              collection[item.SupplyChainRelationshipID.toString()] = { ...item };
              return collection;
            }, {}),
          [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem]: list[DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem]
            .reduce((collection: any, item: DeliveryDocumentListEditForCache) => {
              collection[item.SupplyChainRelationshipID.toString()] = { ...item };
              return collection;
            }, {})
        },
        [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: {
          ...createFormDataForKeyNameEditingArray(
            list[DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem],
            DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem,
            [
              { keyName: 'PlannedGoodsReceiptDate' },
              { keyName: 'DeliverToPlantName' },
              { keyName: 'DeliverFromPlantName' },
            ],
            'DeliveryDocument',
          ),
        },
        [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: {
          ...createFormDataForKeyNameEditingArray(
            list[DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem],
            DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem,
            [
              { keyName: 'PlannedGoodsReceiptDate' },
              { keyName: 'DeliverToPlantName' },
              { keyName: 'DeliverFromPlantName' },
            ],
            'DeliveryDocument',
          ),
        },
      },
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: list[DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem],
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: list[DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem],
    });
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
    ]);

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage();
  }

  const setEditList = (
    editListIndex: number,
    editListKey: string,
    isClose: boolean = false,
    keyName: string,
  ) => {
    setFormData({
      ...formData,
      editList: {
        ...formData.editList,
        [editListKey]: [
          ...formData.editList[editListKey].map((item: any, index: number) => {
            return {
              isEditing: (() => {
                if (isClose) { return false; }

                return index === editListIndex ? !item[keyName].isEditing : item[keyName].isEditing;
              })()
            }
          })
        ]
      }
    });

    createEditFormData(
      formData,
      setFormData,
      editListIndex,
      editListKey,
      isClose,
    );
  }

  const onUpdateItem = async (
    value: any,
    updateItemIndex: number,
    updateItemKey: string,
    params: any,
    listType: string,
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
          accepter: ['Header'],
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
          deliveryDocument: params.DeliveryDocument.DeliveryDocument,
          userType: displayData,
          language,
          businessPartner,
          emailAddress,
        });
      })(),
    ]);

    const itemIdentification = params.DeliveryDocument.DeliveryDocument;

    // const updateData = {
    //   ...formData,
    //   [listType]: [
    //     ...formData[listType].map((item: any, index: number) => {
    //       if (item.DeliveryDocument === itemIdentification) {
    //         return {
    //           ...item,
    //           [updateItemKey]: value,
    //         }
    //       }
    //       return { ...item }
    //     })
    //   ],
    // };

    // if (apiType !== 'cancel') {
    //   updateData.editList = {
    //     ...formData.editList,
    //     [listType]: [
    //       ...formData.editList[listType].map((item: any, index: number) => {
    //         return {
    //           isEditing: index === updateItemIndex ? !item.isEditing : item.isEditing,
    //         };
    //       })
    //     ]
    //   }
    // }

    // setFormData(updateData);

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 入出荷一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'入出荷情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: UserTypeEnum.DeliverToParty,
              [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: UserTypeEnum.DeliverFromParty,
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
        {formData &&
          <Content
            formData={formData}
            setEditList={setEditList}
            onClickHandler={(toggleDisplayEnum: DeliveryDocumentTablesEnum) => {
              setSearchTextDescription(toggleDisplayEnum);
              toggleDisplayEnum === DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem ?
                setDisplayData(UserTypeEnum.DeliverToParty) : setDisplayData(UserTypeEnum.DeliverFromParty);
            }}
            onUpdateItem={onUpdateItem}
            setFormData={setFormData}
            initLoadTabData={initLoadTabData}
          />
        }
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

export default DeliveryDocumentList;
