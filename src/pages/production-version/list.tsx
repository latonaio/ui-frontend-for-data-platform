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
import { getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { deletes, updates} from '@/api/productionVersion';

interface PageProps {
}

export interface editList {
  [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]: TextFieldProps[];
}

export type onUpdateItem = (
	value: any,
	index: number,
	itemType: string,
	params: any,
	listType: string,
	apiType?: string,
  ) => void;

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

    productionVersionCache.updateProductionVersionList({
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

export default productionVersionList;
