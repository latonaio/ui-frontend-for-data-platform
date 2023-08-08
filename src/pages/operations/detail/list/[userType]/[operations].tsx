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
import { getLocalStorage, toUpperCase } from '@/helpers/common';
import { operationsCache } from '@/services/cacheDatabase/operations';
import { createFormDataForEditingArray, getSearchTextDescription, createFormDataForSelectObject} from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { updates } from '@/api/deliveryDocument';
import { deleteEquipment } from '@/api/equipment';



interface PageProps {
  operations: number;
  userType: string;
}

export interface editList {
}

export interface formData {
  [OperationsTablesEnum.operationsDetailList]:
  OperationsDetailListItem[];
  editList: any;
}

const OperationsDetailList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData>({
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
	  operations: operations,
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


