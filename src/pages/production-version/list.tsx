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
  ProductionOrderItem,
  ProductionOrderTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { productionOrderCache } from '@/services/cacheDatabase/productionOrder';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';

interface PageProps {
}

export interface editList {
  [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]: TextFieldProps[];
}

export interface formData {
  [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]: ProductionOrderItem[];
  editList: editList;
}

const ProductionOrderList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(
    ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem
  );
  const [formData, setFormData] = useState<formData | any>({});

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await productionOrderCache.getProductionOrderList();

    setFormData({
      [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]:
        list[ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem],
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

    await productionOrderCache.updateProductionOrderList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner),
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
              [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]:
              UserTypeEnum.OwnerProductionPlantBusinessPartner,
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

export default ProductionOrderList;
