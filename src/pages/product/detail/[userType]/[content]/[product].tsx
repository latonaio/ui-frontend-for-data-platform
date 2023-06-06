import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductDetailContent as Content } from '@/components/Content';
import { ContentsTop } from '@/components/ContentsTop';
import { getSearchTextDescription } from '@/helpers/pages';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  ProductDetailExconfListHeader,
  ProductDetailExconfList as ProductDetailExconfListType,
  ProductTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { productCache } from '@/services/cacheDatabase/product';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  product: string;
  content: string;
  userType: string;
}

export type DisplayData = {
  content: string;
  [ProductTablesEnum.productDetailExconfList]: ProductDetailExconfListType | null;
  [ProductTablesEnum.productDetailExconfListHeader]: ProductDetailExconfListHeader | null;
} | null;

const ProductDetailExconfList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState<DisplayData>(null);
  const dispatch = useDispatch();
  const setFormDataForPage = async (
    product: string,
    content: string,
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
      setDisplayData({
        ...detail,
        content,
      });
    }
  }

  const initLoadTabData = async (
    product: string,
    content: string,
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
      content,
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
      content,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));

  }

  useEffect(() => {
    initLoadTabData(
      data.product,
      data.content,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 品目詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
      <ContentsTop
          className={'ContentsTopNav'}
          title={'品目詳細を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.BusinessPartner]: UserTypeEnum.BusinessPartner,
            }
          )}
        />
        {displayData &&
          <Content
            data={displayData}
          />
        }
      </Main>
      <Footer hrefPath={`/product/detail/exconf/list/${UserTypeEnum.BusinessPartner}/${data.product}`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    product,
    content,
    userType,
  } = context.query;

  return {
    props: {
      product,
      content,
      userType,
    }
  }
}

export default ProductDetailExconfList;
