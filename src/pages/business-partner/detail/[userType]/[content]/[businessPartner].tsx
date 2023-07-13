import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BusinessPartnerDetailContent as Content } from '@/components/Content';
import { ContentsTop } from '@/components/ContentsTop';
import { getSearchTextDescription } from '@/helpers/pages';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  BusinessPartnerDetailExconfListHeader,
  BusinessPartnerDetailExconfList as BusinessPartnerDetailExconfListType,
  BusinessPartnerTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { businessPartnerCache } from '@/services/cacheDatabase/businessPartner';


interface PageProps {
  businessPartner: number;
  content: string;
  userType: string;

}

export type DisplayData = {
  content: string;
  [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]: BusinessPartnerDetailExconfListType | null;
  [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]: BusinessPartnerDetailExconfListHeader | null;
} | null;

const BusinessPartnerDetailExconfList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState<DisplayData>(null);
  const dispatch = useDispatch();
  const setFormDataForPage = async (
    businessPartner: number,
    content: string,
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
      setDisplayData({
        ...detail,
        content,
      });
    }
  }

  const initLoadTabData = async (
    content: string,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      businessPartner,
      content,
      userType,
    );

    await businessPartnerCache.updateBusinessPartnerDetailExconfList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BusinessPartner),
    });

    await setFormDataForPage(
      businessPartner,
      content,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));

  }

  useEffect(() => {
    initLoadTabData(
      data.content,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 ビジネスパートナ詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
      <ContentsTop
          className={'ContentsTopNav'}
          title={'ビジネスパートナ詳細を照会しています'}
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
          />
        }
      </Main>
      <Footer hrefPath={`/business-partner/detail/exconf/list/${UserTypeEnum.BusinessPartner}/${data.businessPartner}`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    content,
    userType,
	businessPartner,
  } = context.query;

  return {
    props: {
      content,
      userType,
	  businessPartner,
    }
  }
}

export default BusinessPartnerDetailExconfList;
