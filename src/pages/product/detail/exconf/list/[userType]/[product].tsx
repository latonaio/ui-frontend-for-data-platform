import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductDetailExconfList as Content } from '@/components/Content';
import { ContentsTop } from '@/components/ContentsTop';
import { getSearchTextDescription } from '@/helpers/pages';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  ProductDetailExconfListHeader,
//   ProductDetailExconfListItem,
  ProductDetailExconfList as ProductDetailExconfListType,
  ProductTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { productCache } from '@/services/cacheDatabase/product';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  product: string;
  userType: string;
}

export type DisplayData = {
  [ProductTablesEnum.productDetailExconfList]: ProductDetailExconfListType | null;
  [ProductTablesEnum.productDetailExconfListHeader]: ProductDetailExconfListHeader | null;
} | null;

const ProductDetailExconfList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState<DisplayData>(null);
  const dispatch = useDispatch();
  const setFormDataForPage = async (
    product: string,
    userType: string,
  ) => {
    const detail = await productCache.getProductDetailExconfList(
      product,
      UserTypeEnum.BusinessPartner,
    );

    if (
      detail[ProductTablesEnum.productDetailExconfList] &&
      detail[ProductTablesEnum.productDetailExconfListHeader]
    ) {
      setDisplayData(detail);
    }
  }

  const initLoadTabData = async (
    product: string,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      product,
      userType,
    );

    await productCache.updateProductDetailExconfList({
      product,
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BusinessPartner),
    });

    await setFormDataForPage(
      product,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData(
      data.product,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 品目詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'品目詳細を選択してください'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.BusinessPartner]: UserTypeEnum.BusinessPartner,
            },
          )}
        />
        {displayData &&
          <Content
            data={displayData}
          />
        }
      </Main>
      <Footer hrefPath={`/product/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    product,
    userType,
  } = context.query;

  return {
    props: {
      product,
      userType,
    }
  }
}

export default ProductDetailExconfList;
