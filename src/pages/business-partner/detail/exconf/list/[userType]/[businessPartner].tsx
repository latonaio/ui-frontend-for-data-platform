import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BusinessPartnerDetailExconfList as Content } from '@/components/Content';
import { ContentsTop } from '@/components/ContentsTop';
import { getSearchTextDescription } from '@/helpers/pages';
import { getLocalStorage, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  BusinessPartnerDetailExconfList as BusinessPartnerDetailExconfListType,
  BusinessPartnerTablesEnum,
  UserTypeEnum, BusinessPartnerDetailExconfListHeader,
} from '@/constants';
import { businessPartnerCache } from '@/services/cacheDatabase/businessPartner';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  businessPartner: number;
  userType: string;
}

export type DisplayData = {
  [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]: BusinessPartnerDetailExconfListType | null;
  [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]: BusinessPartnerDetailExconfListHeader | null;
} | null;

const BusinessPartnerDetailExconfList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState<DisplayData>(null);
  const dispatch = useDispatch();
  const setFormDataForPage = async (
    businessPartner: number,
    userType: string,
  ) => {
    const detail = await businessPartnerCache.getBusinessPartnerDetailExconfList(
      businessPartner,
      userType,
    );

    if (
      detail[BusinessPartnerTablesEnum.businessPartnerDetailExconfList] &&
      detail[BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]
    ) {
      setDisplayData(detail);
    }
  }

  const initLoadTabData = async (
    businessPartner: number,
    userType: string,
  ) => {
    const {
      language,
    //   businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      businessPartner,
      userType,
    );

    await businessPartnerCache.updateBusinessPartnerDetailExconfList({
      language,
      businessPartner,
      emailAddress,
      userType,
    });

    await setFormDataForPage(
      businessPartner,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData(
      data.businessPartner,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 ビジネスパートナ詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
      <ContentsTop
          className={'ContentsTopNav'}
          title={'ビジネスパートナ詳細を選択してください'}
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
            userType={data.userType}
          />
        }
      </Main>
      <Footer hrefPath={`/business-partner/list`}></Footer>
    </Wrapper>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    businessPartner,
    userType,
  } = context.query;

  return {
    props: {
		businessPartner: Number(businessPartner),
		userType,
    },
  };
}

export default BusinessPartnerDetailExconfList;


