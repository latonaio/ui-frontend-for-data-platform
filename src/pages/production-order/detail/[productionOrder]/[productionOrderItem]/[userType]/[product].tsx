import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { ProductionOrderDetail as Content } from '@/components/Content';
import { getLocalStorage, paginationArrow, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  ProductionOrderTablesEnum,
  ProductionOrderDetailProps,
  UserTypeEnum,
} from '@/constants';
import { productionOrderCache } from '@/services/cacheDatabase/productionOrder';
import { useDispatch } from 'react-redux';
import { store } from '@/store/store';
import { getSearchTextDescription } from '@/helpers/pages';
import { readsPagination } from '@/api/productionOrder/detail';
import { setPagination } from '@/store/slices/production-order/pagination';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  productionOrder: number;
  productionOrderItem: number;
  product: string;
  userType: UserTypeEnum;
}

export interface formData {
  editList: any;
  [ProductionOrderTablesEnum.productionOrderDetail]: ProductionOrderDetailProps | null;
}

export enum ActiveMenuTab {
  configurationItem = 'configurationItem',
  productionOrder = 'productionOrder',
}

const ProductionOrderDetail: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState<ProductionOrderDetailProps | null>(null);

  const [formData, setFormData] = useState<formData>({
    editList: {},
    [ProductionOrderTablesEnum.productionOrderDetail]: {} as ProductionOrderDetailProps,
  });

  const [paginationData, setPaginationData] = useState({});
  const [activeMenuTab, setActiveMenuTab] = useState<ActiveMenuTab>(ActiveMenuTab.configurationItem);

  const dispatch = useDispatch();

  const setFormDataForPage = async (
    productionOrder: number,
    productionOrderItem: number,
    userType: string,
    product: string,
  ) => {
    const detail = await productionOrderCache.getProductionOrderDetail(
      productionOrder,
      productionOrderItem,
      product,
    );

    setFormData({
      editList: {},
      [ProductionOrderTablesEnum.productionOrderDetail]: detail || null,
    });

    if (detail) {
      setDisplayData(detail);
    }
  }

  const initLoadTabData = async (
    productionOrder: number,
    productionOrderItem: number,
    product: string,
    userType: UserTypeEnum,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      productionOrder,
      productionOrderItem,
      userType,
      product,
    );

    const detailResponse = await productionOrderCache.updateProductionOrderDetail({
      productionOrder,
      productionOrderItem,
      product,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    setDisplayData(detailResponse);

    const paginationResponse = await readsPagination({
      userType,
      productionOrder,
      productionOrderItem,
      product,
      language,
      businessPartner,
      userId: emailAddress,
    });

    setPaginationData({
      ...paginationArrow(
        paginationResponse.productionOrderDetailPagination.Paginations,
        productionOrderItem,
        'productionOrder'
      ),
      userType,
    });

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData(
      data.productionOrder,
      data.productionOrderItem,
      data.product,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 製造指図詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'製造指図詳細を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.OwnerProductionPlantBusinessPartner]:
                [UserTypeEnum.OwnerProductionPlantBusinessPartner],
            },
          )}
          selectMenuTabs={{
            activeMenuTab,
            menu: [
              { type: ActiveMenuTab.configurationItem, text: '構成品目' },
              { type: ActiveMenuTab.productionOrder, text: '作業手順' }
            ],
            onClick: (type: ActiveMenuTab[keyof ActiveMenuTab]) => {
              if (type === activeMenuTab) { return; }

              setActiveMenuTab(type as ActiveMenuTab);
            },
          }}
        />
        {displayData && formData &&
          <Content
            data={displayData}
            formData={formData}
            paginationData={paginationData}
            activeMenuTab={activeMenuTab}
          />}
      </Main>
      <Footer hrefPath={`/production-order/detail/list/${data.userType}/${data.productionOrder}`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    productionOrder,
    productionOrderItem,
    product,
    userType
  } = context.query;

  return {
    props: {
      productionOrder: Number(productionOrder),
      productionOrderItem: Number(productionOrderItem),
      product,
      userType,
    }
  }
}

export default ProductionOrderDetail;
