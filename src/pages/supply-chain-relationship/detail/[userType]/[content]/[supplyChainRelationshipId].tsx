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
  SupplyChainRelationshipDetailList as SupplyChainRelationshipDetailListType,
  UserTypeEnum,
  SupplyChainRelationshipTablesEnum, SupplyChainRelationshipDetailHeader,
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
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetail]: SupplyChainRelationshipDetailListType | null;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailHeader]: SupplyChainRelationshipDetailHeader | null;
} | null;

const SupplyChainRelationshipDetail: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState<DisplayData>(null);
  const dispatch = useDispatch();
  const setFormDataForPage = async (
    supplyChainRelationshipId: number,
    content: string,
    userType: string,
  ) => {
    const detail = await supplyChainRelationshipCache.getSupplyChainRelationshipDetail(
      supplyChainRelationshipId,
      data.userType,
    );

    if (
      detail[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetail] &&
      detail[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailHeader]
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

    await supplyChainRelationshipCache.updateSupplyChainRelationshipDetail({
      supplyChainRelationshipId,
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(userType),
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
      <Footer hrefPath={`/supply-chain-relationship/detail/exconf/list/${data.userType}/${data.supplyChainRelationshipId}`}></Footer>
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

export default SupplyChainRelationshipDetail;
