import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { ProductionVersionDetailList as Content } from '@/components/Content';
import {
  AuthedUser,
  ProductionVersionDetailListItem,
  UserTypeEnum,
  ProductionVersionTablesEnum,
  ProductionVersionDetailListHeader,
} from '@/constants';
import { getLocalStorage, toUpperCase } from '@/helpers/common';
import { productionVersionCache } from '@/services/cacheDatabase/productionVersion';
import { createFormDataForEditingArray, getSearchTextDescription, createFormDataForSelectObject} from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { updates } from '@/api/deliveryDocument';
import { deleteEquipment } from '@/api/equipment';



interface PageProps {
  productionVersion: number;
  userType: string;
}

export interface editList {
}

export interface formData {
  [ProductionVersionTablesEnum.productionVersionDetailList]:
  ProductionVersionDetailListItem[];
  editList: any;
}

const ProductionVersionDetailList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData>({
    editList: {},
    [ProductionVersionTablesEnum.productionVersionDetailList]: [],
  });
  const dispatch = useDispatch();

  const setFormDataForPage = async (productionVersion: number, userType: string) => {
    const list = await productionVersionCache.getProductionVersionDetailList(productionVersion, userType);
    setFormData({
      ...createFormDataForSelectObject([]),
      editList: {},
      [ProductionVersionTablesEnum.productionVersionDetailList]: list.productionVersionDetailList || [],
    });

    setDisplayData({
      userType,
      [ProductionVersionTablesEnum.productionVersionDetailList]: list.productionVersionDetailList || [],
      [ProductionVersionTablesEnum.productionVersionDetailListHeader]: list.productionVersionDetailListHeader || {},
    });
  }

  const initLoadTabData = async (productionVersion: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      productionVersion,
      userType,
    );

    await productionVersionCache.updateProductionVersionDetailList({
      productionVersion: productionVersion,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      productionVersion,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));
  };


  useEffect(() => {
    initLoadTabData(data.productionVersion, data.userType);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 製造バージョン明細一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'製造バージョン明細一覧を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.OwnerBusinessPartner]:
                [UserTypeEnum.OwnerBusinessPartner],
            },
          )}
        />
        {displayData && formData &&
          <Content
            data={displayData}
            formData={formData}
            userType={data.userType}
            productionVersion={data.productionVersion}
          />
        }
      </Main>
      <Footer hrefPath={`/production-version/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productionVersion, userType } = context.query;

  return {
    props: {
      productionVersion: Number(productionVersion),
      userType,
    },
  };
}

export default ProductionVersionDetailList;


