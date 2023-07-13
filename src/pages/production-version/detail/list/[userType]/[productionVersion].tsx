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
import { deletes, updates } from '@/api/productionVersion';
import { get } from 'http';
import { toLowerCase } from '@/helpers/common';



interface PageProps {
  productionVersion: number;
  userType: string;
}

export interface editList {
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
  [ProductionVersionTablesEnum.productionVersionDetailList]:
  ProductionVersionDetailListItem[];
  editList: any;
}

const ProductionVersionDetailList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData | any>({
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
  const onUpdateItem =async (
	value: any,
    updateItemIndex: number,
    updateItemKey: string,
    params: any,
    listType: string,
    apiType: string = 'update',
	productionVersion: number,
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

		  productionVersionCache.updateProductionVersionDetailList({
			productionVersion,
			language,
			businessPartner,
			emailAddress,
			userType: toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner),
		  });

		  const itemIdentification = params.OperationslMaster.Oeratins;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.ProductionVersion === itemIdentification) {
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
			onUpdateItem={onUpdateItem}
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


