import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { DeliveryDocumentDetail as Content } from '@/components/Content';
import { getLocalStorage, paginationArrow, toUpperCase } from '@/helpers/common';
import { AuthedUser, UserTypeEnum } from '@/constants';
import { deliveryDocumentCache } from '@/services/cacheDatabase/deliveryDocument';
import { readsPagination } from '@/api/deliveryDocument/detail';
import { getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  deliveryDocument: number;
  deliveryDocumentItem: number;
  product: string;
  userType: UserTypeEnum;
}

const DeliveryDocumentDetail: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [paginationData, setPaginationData] = useState({});

  const dispatch = useDispatch();

  const setFormDataForPage = async (
    deliveryDocument: number,
    deliveryDocumentItem: number,
    product: string,
  ) => {
    const detail = await deliveryDocumentCache.getDeliveryDocumentDetail(
      deliveryDocument,
      deliveryDocumentItem,
      product,
    );

    if (detail) {
      setDisplayData(detail);
    }
  }

  const initLoadTabData = async (
    deliveryDocument: number,
    deliveryDocumentItem: number,
    product: string,
    userType: UserTypeEnum,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage(
      deliveryDocument,
      deliveryDocumentItem,
      product,
    );

    dispatch(setLoading({ isOpen: true }));

    const detailResponse = await deliveryDocumentCache.updateDeliveryDocumentDetail({
      userType,
      deliveryDocument,
      deliveryDocumentItem,
      product,
      language,
      businessPartner,
      emailAddress,
    });

    setDisplayData(detailResponse);

    const paginationResponse = await readsPagination({
      userType,
      deliveryDocument,
      deliveryDocumentItem,
      product,
      language,
      businessPartner,
      userId: emailAddress,
    });

    dispatch(setLoading({ isOpen: false }));

    setPaginationData({
      ...paginationArrow(
        paginationResponse.deliveryDocumentDetailPagination.Paginations,
        deliveryDocumentItem,
        'deliveryDocument'
      ),
      userType,
    });
  }

  useEffect(() => {
    initLoadTabData(
      data.deliveryDocument,
      data.deliveryDocumentItem,
      data.product,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 入出荷詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'入出荷詳細を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.DeliverToParty]: UserTypeEnum.DeliverToParty,
              [UserTypeEnum.DeliverFromParty]: UserTypeEnum.DeliverFromParty,
            }
          )}
        />
        {displayData &&
          <Content
            data={displayData}
            paginationData={paginationData}
          />}
      </Main>
      <Footer hrefPath={`/delivery-document/detail/list/${data.userType}/${data.deliveryDocument}`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    deliveryDocument,
    deliveryDocumentItem,
    product,
    userType
  } = context.query;

  return {
    props: {
      deliveryDocument: Number(deliveryDocument),
      deliveryDocumentItem: Number(deliveryDocumentItem),
      product,
      userType,
    }
  }
}

export default DeliveryDocumentDetail;
