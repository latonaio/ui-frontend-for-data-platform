import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { InvoiceDocumentDetailList as Content } from '@/components/Content';
import {
  AuthedUser,
  InvoiceDocumentDetailListItem,
  InvoiceDocumentTablesEnum,
  UserTypeEnum
} from '@/constants';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import { invoiceDocumentCache } from '@/services/cacheDatabase/invoiceDocument';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { setLoading } from '@/store/slices/loadging';
import { cancels, updates } from '@/api/invoiceDocument';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { deliveryDocumentCache } from '@/services/cacheDatabase/deliveryDocument';

interface PageProps {
  invoiceDocument: number;
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
  [InvoiceDocumentTablesEnum.invoiceDocumentDetailList]: InvoiceDocumentDetailListItem[];
  editList: any;
}

const InvoiceDocumentList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData>({
    editList: {},
    [InvoiceDocumentTablesEnum.invoiceDocumentDetailList]: [],
  });

  const setFormDataForPage = async (invoiceDocument: number, userType: string, businessPartner: number) => {
    const list = await invoiceDocumentCache.getInvoiceDocumentDetailList(invoiceDocument, userType);

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list.invoiceDocumentDetailList,
          [
            { keyName: 'isCancelled' },
            { keyName: 'itemBillingIsConfirmed' },
          ]
        ),
      },
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailList]: list.invoiceDocumentDetailList || [],
    });

    setDisplayData({
      businessPartner,
      userType,
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailList]: list.invoiceDocumentDetailList || [],
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailHeader]: list.invoiceDocumentDetailHeader || {},
    });
  }

  const initLoadTabData = async (invoiceDocument: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');
    dispatch(setLoading({ isOpen: true }));
    await setFormDataForPage(
      invoiceDocument,
      userType,
      businessPartner,
    );

    await invoiceDocumentCache.updateInvoiceDocumentDetailList({
      invoiceDocument,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      invoiceDocument,
      userType,
      businessPartner,
    );
    dispatch(setLoading({ isOpen: false }));
  };

  const dispatch = useDispatch();

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

    if (apiType === 'cancel' || apiType === 'update') {
      if (apiType === 'cancel') {
        await cancels({
          ...params,
          business_partner: businessPartner,
          accepter: accepter(params).accepter,
        });
      }

      if (apiType === 'update') {
        await updates({
          ...params,
          business_partner: businessPartner,
          accepter: accepter(params).accepter,
        });
      }
    } else {
    }

    invoiceDocumentCache.updateInvoiceDocumentDetailList({
      invoiceDocument: data.invoiceDocument,
      userType: data.userType,
      language,
      businessPartner,
      emailAddress,
    });

    invoiceDocumentCache.updateInvoiceDocumentList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BillToParty),
    });

    invoiceDocumentCache.updateInvoiceDocumentList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BillFromParty),
    });

    const paramsItem = params.InvoiceDocument.Item[0].InvoiceDocumentItem;

    const editListKeyName = updateItemKey.replace(/^./g, (g) => g[0].toLowerCase());

    const updateData = {
      ...formData,
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailList]: [
        ...formData[InvoiceDocumentTablesEnum.invoiceDocumentDetailList].map((item: any, index: number) => {
          if (item.InvoiceDocumentItem === paramsItem) {
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
    initLoadTabData(data.invoiceDocument, data.userType);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 請求詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'請求詳細を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.BillToParty]: [UserTypeEnum.BillToParty],
              [UserTypeEnum.BillFromParty]: [UserTypeEnum.BillFromParty],
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
                    await invoiceDocumentCache.updateInvoiceDocumentList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.BillToParty),
                    });
                  })(),
                  (async () => {
                    await invoiceDocumentCache.updateInvoiceDocumentList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.BillFromParty),
                    });
                  })(),
                  (async () => {
                    await invoiceDocumentCache.updateInvoiceDocumentDetailList({
                      invoiceDocument: data.invoiceDocument,
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
                await initLoadTabData(data.invoiceDocument, data.userType);
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
            invoiceDocument={data.invoiceDocument}
            onUpdateItem={onUpdateItem}
          />}
      </Main>
      <Footer hrefPath={`/invoice-document/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { invoiceDocument, userType } = context.query;

  return {
    props: {
      invoiceDocument: Number(invoiceDocument),
      userType,
    }
  }
}

export default InvoiceDocumentList;
