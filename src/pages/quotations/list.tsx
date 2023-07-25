import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { QuotationsList as Content } from '@/components/Content';
import {
  AuthedUser,
  QuotationsBuyerItem,
  QuotationsTablesEnum,
  QuotationsSellerItem,
  UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { quotationsCache } from '@/services/cacheDatabase/quotations';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { cancels, deletes } from '@/api/quotations';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';

interface PageProps {
}

interface editList {
  [QuotationsTablesEnum.quotationsListBuyerItem]: TextFieldProps[];
  [QuotationsTablesEnum.quotationsListSellerItem]: TextFieldProps[];
}

export interface formData {
  [QuotationsTablesEnum.quotationsListBuyerItem]: QuotationsBuyerItem[];
  [QuotationsTablesEnum.quotationsListSellerItem]: QuotationsSellerItem[];
  editList: editList;
}

const QuotationsList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(QuotationsTablesEnum.quotationsListBuyerItem);
  const [formData, setFormData] = useState<formData | any>({});
  const [displayData, setDisplayData] = useState(UserTypeEnum.Buyer);

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await quotationsCache.getQuotationsList();

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list[QuotationsTablesEnum.quotationsListBuyerItem],
          [
            { keyName: QuotationsTablesEnum.quotationsListBuyerItem },
          ],
        ),
        ...createFormDataForEditingArray(
          list[QuotationsTablesEnum.quotationsListSellerItem],
          [
            { keyName: QuotationsTablesEnum.quotationsListSellerItem },
          ],
        ),
      },
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

    await Promise.all([
      (async () => {
        await quotationsCache.updateQuotationsList({
          language,
          businessPartner,
          emailAddress,
          userType: toLowerCase(UserTypeEnum.Buyer),
        });
      })(),
      (async () => {
        await quotationsCache.updateQuotationsList({
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

  const onCancelItem = async (
    value: any,
    updateItemIndex: number,
    updateItemKey: string,
    params: any,
    listType: string,
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

    if (updateItemKey === 'IsCancelled') {
      await cancels({
        ...params,
        business_partner: businessPartner,
        accepter: accepter(params).accepter,
      });
    }

    if (updateItemKey === 'IsMarkedForDeletion') {
      await deletes({
        ...params,
        business_partner: businessPartner,
        accepter: accepter(params).accepter,
      });
    }

    quotationsCache.updateQuotationsList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.Buyer),
    });

    quotationsCache.updateQuotationsList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.Seller),
    });

    // quotationsCache.updatePriceMasterDetailList({
    //   orderId: params.PriceMaster.OrderID,
    //   userType: displayData,
    //   language,
    //   businessPartner,
    //   emailAddress,
    // });

    const itemIdentification = params.Quotations;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.Quotations === itemIdentification) {
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
      <Header title={'データ連携基盤 見積一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'見積情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [QuotationsTablesEnum.quotationsListBuyerItem]: UserTypeEnum.Buyer,
              [QuotationsTablesEnum.quotationsListSellerItem]: UserTypeEnum.Seller,
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
                    await quotationsCache.updateQuotationsList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.Buyer),
                    });
                  })(),
                  (async () => {
                    await quotationsCache.updateQuotationsList({
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
        {formData &&
          <Content
            formData={formData}
            onClickHandler={(toggleDisplayEnum: QuotationsTablesEnum) => {
              setSearchTextDescription(toggleDisplayEnum);
              toggleDisplayEnum === QuotationsTablesEnum.quotationsListBuyerItem ?
                setDisplayData(UserTypeEnum.Buyer) : setDisplayData(UserTypeEnum.Seller);
            }}
            onCancelItem={onCancelItem}
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

export default QuotationsList;
