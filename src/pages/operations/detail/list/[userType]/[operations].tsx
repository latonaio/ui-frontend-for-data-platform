import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { OperationsDetailList as Content } from '@/components/Content';
import {
  AuthedUser,
  OperationsDetailListItem,
  UserTypeEnum,
  OperationsTablesEnum,
  OperationsDetailHeader,
} from '@/constants';
import { getLocalStorage, toUpperCase, toLowerCase } from '@/helpers/common';
import { operationsCache } from '@/services/cacheDatabase/operations';
import { createFormDataForEditingArray, getSearchTextDescription, createFormDataForSelectObject} from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { deletes, updates } from '@/api/operations';



interface PageProps {
  operations: number;
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
  [OperationsTablesEnum.operationsDetailList]:
  OperationsDetailListItem[];
  editList: any;
}

const OperationsDetailList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData | any>({
    editList: {},
    [OperationsTablesEnum.operationsDetailList]: [],
  });
  const dispatch = useDispatch();

  const setFormDataForPage = async (operations: number, userType: string) => {
    const list = await operationsCache.getOperationsDetailList(operations, userType);
    setFormData({
      ...createFormDataForSelectObject([]),
      editList: {},
      [OperationsTablesEnum.operationsDetailList]: list.operationsDetailList || [],
    });

    setDisplayData({
      userType,
      [OperationsTablesEnum.operationsDetailList]: list.operationsDetailList || [],
      [OperationsTablesEnum.operationsDetailHeader]: list.operationsDetailHeader || {},
    });
  }

  const initLoadTabData = async (operations: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      operations,
      userType,
    );

    await operationsCache.updateOperationsDetailList({
	  operations,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
	  operations,
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
	operations: number,
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

		  operationsCache.updateOperationsDetailList({
			operations,
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
    initLoadTabData(data.operations, data.userType);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 作業手順明細一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'作業手順明細一覧を照会しています'}
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
            operations={data.operations}
			onUpdateItem={onUpdateItem}
          />
        }
      </Main>
      <Footer hrefPath={`/operations/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { operations, userType } = context.query;

  return {
    props: {
		operations: Number(operations),
      userType,
    }
  }
}

export default OperationsDetailList;


