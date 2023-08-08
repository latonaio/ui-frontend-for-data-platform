import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  SupplyChainRelationshipDetailContent as Content,
} from '@/components/Content';
import { ContentsTop } from '@/components/ContentsTop';
import { getSearchTextDescription } from '@/helpers/pages';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  SupplyChainRelationshipDetailExconfListHeader,
  SupplyChainRelationshipDetailExconfList as SupplyChainRelationshipDetailExconfListType,
  UserTypeEnum,
  SupplyChainRelationshipTablesEnum,
} from '@/constants';
import { supplyChainRelationshipCache } from '@/services/cacheDatabase/supplyChainRelationship';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  supplyChainRelationshipId: number;
  content: string;
  userType: string;
}

export type DisplayData = {
  content: string;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]: SupplyChainRelationshipDetailExconfListType | null;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]: SupplyChainRelationshipDetailExconfListHeader | null;
} | null;

const SupplyChainRelationshipDetailExconfList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState<DisplayData>(null);
  const dispatch = useDispatch();
  const setFormDataForPage = async (
    supplyChainRelationshipId: number,
    content: string,
    userType: string,
  ) => {
    const detail = await supplyChainRelationshipCache.getSupplyChainRelationshipDetailExconfList(
      supplyChainRelationshipId,
      '',
    );

    if (
      detail[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList] &&
      detail[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]
    ) {
      setDisplayData({
        ...detail,
        content,
      });
    }
  }

  const initLoadTabData = async (
    supplyChainRelationshipId: number,
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
      supplyChainRelationshipId,
      content,
      userType,
    );

    await supplyChainRelationshipCache.updateSupplyChainRelationshipDetailExconfList({
      supplyChainRelationshipId,
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BusinessPartner),
    });

    await setFormDataForPage(
      supplyChainRelationshipId,
      content,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));

  }

  useEffect(() => {
    initLoadTabData(
      data.supplyChainRelationshipId,
      data.content,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 Supply Chain Relationship Master 一覧'} className={'text-2xl'} />
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
          />
        }
      </Main>
      <Footer hrefPath={`/supply-chain-relationship/detail/exconf/list/${UserTypeEnum.BusinessPartner}/${data.supplyChainRelationshipId}`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    supplyChainRelationshipId,
    content,
    userType,
  } = context.query;

  return {
    props: {
      supplyChainRelationshipId: Number(supplyChainRelationshipId),
      content,
      userType,
    }
  }
}

export default SupplyChainRelationshipDetailExconfList;
