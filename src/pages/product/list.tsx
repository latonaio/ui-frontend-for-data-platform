import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { ProductList as Content } from '@/components/Content';
import {
  AuthedUser,
  ProductItem,
  UserTypeEnum,
  ProductTablesEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { productCache } from '@/services/cacheDatabase/product';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { deletes, updates } from '@/api/product';
import { rem } from 'polished';
import { operationsCache } from '@/services/cacheDatabase/operations';

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
  [ProductTablesEnum.productListBusinessPartnerItem]: TextFieldProps[];
}

export interface formData {
  [ProductTablesEnum.productListBusinessPartnerItem]: ProductItem[];
  editList: editList;
}

const ProductList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(
    ProductTablesEnum.productListBusinessPartnerItem
  );
  const [formData, setFormData] = useState<formData | any>({});

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await productCache.getProductList();

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list[ProductTablesEnum.productListBusinessPartnerItem],
          [
            { keyName: ProductTablesEnum.productListBusinessPartnerItem },
          ]
        ),
      },

      [ProductTablesEnum.productListBusinessPartnerItem]:
        list[ProductTablesEnum.productListBusinessPartnerItem],
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

    await productCache.updateProductList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BusinessPartner),
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

    productCache.updateProductList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BusinessPartner),
    });

    const itemIdentification = params.ProductMaster.Product;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.Product === itemIdentification) {
            return {
              ...item,
              [updateItemKey]: value,
            }
          }
          return { ...item }
        })
      ],
    };

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

    setFormData(updateData);

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 品目一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'品目情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [ProductTablesEnum.productListBusinessPartnerItem]:
              UserTypeEnum.BusinessPartner,
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
                    await productCache.updateProductList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.BusinessPartner),
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

export default ProductList;
