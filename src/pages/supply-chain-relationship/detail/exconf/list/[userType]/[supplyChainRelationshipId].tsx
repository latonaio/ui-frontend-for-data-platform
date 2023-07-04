import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SupplyChainRelationshipDetailExconfList as Content } from '@/components/Content';
import { ContentsTop } from '@/components/ContentsTop';
import { getSearchTextDescription } from '@/helpers/pages';
import { getLocalStorage, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  SupplyChainRelationshipDetailExconfList as SupplyChainRelationshipDetailExconfListType,
  SupplyChainRelationshipTablesEnum,
  UserTypeEnum, SupplyChainRelationshipDetailExconfListHeader,
} from '@/constants';
import { supplyChainRelationshipCache } from '@/services/cacheDatabase/supplyChainRelationship';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  supplyChainRelationshipId: number;
  userType: string;
}

export type DisplayData = {
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]: SupplyChainRelationshipDetailExconfListType | null;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]: SupplyChainRelationshipDetailExconfListHeader | null;
} | null;

const SupplyChainRelationshipDetailExconfList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState<DisplayData>(null);
  const dispatch = useDispatch();
  const setFormDataForPage = async (
    supplyChainRelationship: number,
    userType: string,
  ) => {
    const detail = await supplyChainRelationshipCache.getSupplyChainRelationshipDetailExconfList(
      supplyChainRelationship,
      userType,
    );

    if (
      detail[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList] &&
      detail[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]
    ) {
      setDisplayData(detail);
    }
  }

  const initLoadTabData = async (
    supplyChainRelationshipId: number,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      supplyChainRelationshipId,
      userType,
    );

    await supplyChainRelationshipCache.updateSupplyChainRelationshipDetailExconfList({
      supplyChainRelationshipId,
      language,
      businessPartner,
      emailAddress,
      userType,
    });

    await setFormDataForPage(
      supplyChainRelationshipId,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData(
      data.supplyChainRelationshipId,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 Supply Chain Relationship Master 詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
      <ContentsTop
          className={'ContentsTopNav'}
          title={'サプライチェーンリレーションシップマスタ情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.Buyer]: UserTypeEnum.Buyer,
              [UserTypeEnum.Seller]: UserTypeEnum.Seller,
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
      <Footer hrefPath={`/supply-chain-relationship/list`}></Footer>
    </Wrapper>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    supplyChainRelationshipId,
    userType,
  } = context.query;

  return {
    props: {
      supplyChainRelationshipId: Number(supplyChainRelationshipId),
      userType,
    },
  };
}

export default SupplyChainRelationshipDetailExconfList;
