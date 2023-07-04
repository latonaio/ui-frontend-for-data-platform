import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { ProductionVersionList as Content } from '@/components/Content';
import {
  AuthedUser,
  ProductionVersionListItem,
  ProductionVersionTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { productionVersionCache } from '@/services/cacheDatabase/productionVersion';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';

interface PageProps {
}

export interface editList {
  [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]: TextFieldProps[];
}

export interface formData {
  [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]: ProductionVersionListItem[];
  editList: editList;
}

const productionVersionList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(
    ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem
  );
  const [formData, setFormData] = useState<formData | any>({});

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await productionVersionCache.getProductionVersionList();

    console.log(list[ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem])

    setFormData({
      [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]:
        list[ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem],
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

    await productionVersionCache.updateProductionVersionList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.OwnerBusinessPartner),
    });

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage();
  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 製造バージョン一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'製造バージョン情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]:
              UserTypeEnum.OwnerBusinessPartner,
            }
          )}
        />
        {formData &&
          <Content
            formData={formData}
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

export default productionVersionList;
