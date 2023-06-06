import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { BusinessPartnerDetail as Content } from '@/components/Content/Detail';
import { AuthedUser ,BusinessPartnerTablesEnum} from '@/constants';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import { BusinessPartnerDetailProps,UserTypeEnum } from '@/constants';
import { getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  businessPartner: string;
  userType: string;
}

// export type DisplayData = {
//   [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]: businessPartnerDetailExconfListType | null;
//   [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]: BusinessPartnerDetailExconfListHeader | null;
// } | null;

const BusinessPartnerDetailExconfList: React.FC<PageProps> = (data) => {
  // const [displayData, setDisplayData] = useState<DisplayData>(null);
  // const dispatch = useDispatch();
  // const setFormDataForPage = async (
  //   businessPartner: string,
  //   userType: string,
  // ) => {
  //   const detail = await businessPartnerCache.getBusinessPartnerDetailExconfList(
  //     businessPartner,
  //     UserTypeEnum.BusinessPartner,
  //   );

  //   if (
  //     detail[BusinessPartnerTablesEnum.businessPartnerDetailExconfList] &&
  //     detail[BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]
  //   ) {
  //     setDisplayData(detail);
  //   }
  // }

  // const initLoadTabData = async (
  //   businessPartner: string,
  //   userType: string,
  // ) => {
  //   const {
  //     language,
  //     businessPartner,
  //     emailAddress,
  //   }: AuthedUser = getLocalStorage('auth');

  //   dispatch(setLoading({ isOpen: true }));

  //   await setFormDataForPage(
  //     businessPartner,
  //     userType,
  //   );

  //   await businessPartnerCache.updateBusinessPartnerDetailExconfList({
  //     businessPartner,
  //     language,
  //     businessPartner,
  //     emailAddress,
  //     userType: toLowerCase(UserTypeEnum.BusinessPartner),
  //   });

  //   await setFormDataForPage(
  //     businessPartner,
  //     userType,
  //   );

  //   dispatch(setLoading({ isOpen: false }));
  // }

  // useEffect(() => {
  //   initLoadTabData(
  //     data.businessPartner,
  //     data.userType,
  //   );
  // }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 ビジネスパートナー詳細'} className={'text-2xl'} />
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
        {/* {displayData &&
          <Content
            data={displayData}
          />
        } */}
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
      businessPartner,
      userType,
    }
  }
}

export default BusinessPartnerDetailExconfList;
