import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { ProductionOrderDetailList as Content } from '@/components/Content';
import {
  AuthedUser,
  ProductionOrderTablesEnum,
  ProductionOrderDetailListItem,
  UserTypeEnum,
  InvoiceDocumentTablesEnum,
} from '@/constants';
import { getLocalStorage, toUpperCase } from '@/helpers/common';
import {
  createFormDataForSelectObject,
  createFormDataForEditingArray,
  createEditFormData,
  getSearchTextDescription,
} from '@/helpers/pages';
import { productionOrderCache } from '@/services/cacheDatabase/productionOrder';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { updates } from '@/api/deliveryDocument';
import { deleteProductionOrder } from '@/api/productionOrder';
import { toLowerCase } from '@/helpers/common';
interface PageProps {
  productionOrder: number;
  userType: string;
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
}

export interface formData {
  [ProductionOrderTablesEnum.productionOrderDetailList]:
    ProductionOrderDetailListItem[];
  editList: any;
}

const ProductionOrderDetailList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData | any>({
    editList: {},
    [ProductionOrderTablesEnum.productionOrderDetailList]: [],
  });
  const dispatch = useDispatch();

  const setFormDataForPage = async (orderId: number, userType: string) => {
    const list = await productionOrderCache.getProductionOrderDetailList(orderId, userType);
    setFormData({
      ...createFormDataForSelectObject([]),
      editList: {},
      [ProductionOrderTablesEnum.productionOrderDetailList]: list.productionOrderDetailList || [],
    });

    setDisplayData({
      userType,
      [ProductionOrderTablesEnum.productionOrderDetailList]: list.productionOrderDetailList || [],
      [ProductionOrderTablesEnum.productionOrderDetailHeader]: list.productionOrderDetailHeader || {},
    });
  }

  const initLoadTabData = async (productionOrder: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      productionOrder,
      userType,
    );

    await productionOrderCache.updateProductionOrderDetailList({
      productionOrder: productionOrder,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      productionOrder,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));

  };
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
      await deleteProductionOrder({
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

    productionOrderCache.updateProductionOrderList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner),
    });

    const itemIdentification = params.ProductionOrderMaster.ProductionOrder;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.BillOfMaterial === itemIdentification) {
            return {
              ...item,
              [updateItemKey]: value,
            }
          }
          return { ...item }
        })
      ],
    };

    if (apiType !== 'cancel') {
      updateData.editList = {
        ...formData.editList,
        [listType]: [
          ...formData.editList[listType].map((item: any, index: number) => {
            return {
              isEditing: index === updateItemIndex ? !item.isEditing : item.isEditing,
            };
          })
        ]
      }
    }

    setFormData(updateData);

    dispatch(setLoading({ isOpen: false }));
  }


  useEffect(() => {
    initLoadTabData(data.productionOrder, data.userType);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 製造指図詳細一覧'} className={'text-2xl'} />
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
        />
        {displayData && formData &&
          <Content
            data={displayData}
            formData={formData}
            userType={data.userType}
            productionOrder={data.productionOrder}
            onUpdateItem={onUpdateItem}
          />
        }
      </Main>
      <Footer hrefPath={`/production-order/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productionOrder, userType } = context.query;

  return {
    props: {
      productionOrder: Number(productionOrder),
      userType,
    }
  }
}

export default ProductionOrderDetailList;
