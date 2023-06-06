import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { InvoiceDocumentList as Content } from '@/components/Content';
import {
  AuthedUser, InvoiceDocumentListItem,
  InvoiceDocumentTablesEnum, UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { invoiceDocumentCache } from '@/services/cacheDatabase/invoiceDocument';
import { useDispatch } from 'react-redux';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { setLoading } from '@/store/slices/loadging';
import { cancels, updates } from '@/api/invoiceDocument';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';

interface PageProps {
}

export interface onUpdateItem {
  (
    value: any,
    index: number,
    itemType: string,
    params: any,
    listType: string,
    apiType?: string,
  ): void;
}

export interface editList {
  [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]: TextFieldProps[];
  [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]: TextFieldProps[];
}

export interface formData {
  [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]: InvoiceDocumentListItem[];
  [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]: InvoiceDocumentListItem[];
  editList: editList;
}

const DeliveryDocumentList: React.FC<PageProps> = (data ) => {
  const [searchTextDescription, setSearchTextDescription] = useState(InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem);
  const [formData, setFormData] = useState<formData | any>({});
  const [displayData, setDisplayData] = useState(UserTypeEnum.BillToParty);

  const changeSearchTextDescription = (toggleDisplayType?: InvoiceDocumentTablesEnum) => {
    if (toggleDisplayType === InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem) {
      setSearchTextDescription(InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem);
      setDisplayData(UserTypeEnum.BillToParty);
    }

    if (toggleDisplayType === InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem) {
      setSearchTextDescription(InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem);
      setDisplayData(UserTypeEnum.BillFromParty);
    }
  };

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await invoiceDocumentCache.getInvoiceDocumentList();

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list[InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem],
          [
            { keyName: InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem },
          ]
        ),
        ...createFormDataForEditingArray(
          list[InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem],
          [
            { keyName: InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem },
          ]
        ),
      },
      [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]: list[InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem],
      [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]: list[InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem],
    });
  };

  const initLoadTabData = async () => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage();
    dispatch(setLoading({ isOpen: true }));
    await invoiceDocumentCache.updateInvoiceDocumentList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BillToParty),
    });

    await invoiceDocumentCache.updateInvoiceDocumentList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BillFromParty),
    });
    dispatch(setLoading({ isOpen: false }));
    await setFormDataForPage();
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

    if (apiType === 'cancel' || apiType === 'update' ) {
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

    invoiceDocumentCache.updateInvoiceDocumentDetailList({
      invoiceDocument: params.InvoiceDocument.InvoiceDocument,
      userType: displayData,
      language,
      businessPartner,
      emailAddress,
    });

    const itemIdentification = params.InvoiceDocument.InvoiceDocument;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.InvoiceDocument === itemIdentification) {
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
        [listType]: [
          ...formData.editList[listType].map((item: any, index: number) => {
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
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 請求一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'請求情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]: UserTypeEnum.BillToParty,
              [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]: UserTypeEnum.BillFromParty,
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
            onClickHandler={(toggleDisplayEnum: unknown) => {
              changeSearchTextDescription(toggleDisplayEnum as InvoiceDocumentTablesEnum);
            }}
            onUpdateItem={onUpdateItem}
          />}
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
