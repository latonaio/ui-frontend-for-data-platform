import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { OperationsList as Content } from '@/components/Content';
import {
  AuthedUser,
  OperationsItem,
  UserTypeEnum,
  OperationsTablesEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { operationsCache } from '@/services/cacheDatabase/operations';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { deletes, updates } from '@/api/operations';
import { rem } from 'polished';
import { deliveryDocumentCache } from '@/services/cacheDatabase/deliveryDocument';

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
  [OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem]: TextFieldProps[];
}

export interface formData {
  [OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem]: OperationsItem[];
  editList: editList;
}

const OperationsList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(
    OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem
  );
  const [formData, setFormData] = useState<formData | any>({});

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await operationsCache.getOperationsList();

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list[OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem],
          [
            { keyName: OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem },
          ]
        ),
      },

      [OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem]:
        list[OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem],
    });
  }

  const initLoadTabData = async () => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');
    //情報が取得できないのでコメントアウト dispatch(setLoading({ isOpen: true }));
    await setFormDataForPage();

    dispatch(setLoading({ isOpen: true }));

    await operationsCache.updateOperationsList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner),
    });

    await setFormDataForPage();

    dispatch(setLoading({ isOpen: false }));
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

    if (apiType === 'delete') {
      await deletes({
        ...params,
        business_partner: businessPartner,
        accepter: accepter(params).accepter,
      });
    } else {
      await updates({
        ...params,
        accepter: accepter(params).accepter,
      });
    }

    operationsCache.updateOperationsList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner),
    });

    const itemIdentification = params.Operations.Operations;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.Operations === itemIdentification) {
            return {
              ...item,
              [updateItemKey]: value,
            }
          }
          return { ...item }
        })
      ],
    };

    setFormData(updateData);

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 作業手順一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'作業手順情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem]:
              UserTypeEnum.OwnerProductionPlantBusinessPartner,
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
                    await operationsCache.updateOperationsList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner),
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
            onUpdateItem={onUpdateItem}
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

export default OperationsList;
