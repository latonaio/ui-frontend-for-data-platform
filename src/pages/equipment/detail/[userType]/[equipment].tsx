import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { EquipmentDetailList as Content } from '@/components/Content';
import { getLocalStorage, paginationArrow, toUpperCase } from '@/helpers/common';
import { AuthedUser, UserTypeEnum } from '@/constants';
import { equipmentCache } from '@/services/cacheDatabase/equipment';
import { getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';

interface PageProps {
  equipment: number;
  equipmentItem: number;
  product: string;
  userType: UserTypeEnum;
}

const EquipmentDetail: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  // const [paginationData, setPaginationData] = useState({});

  // const dispatch = useDispatch();

  // const setFormDataForPage = async (
  //   equipment: number,
  //   equipmentItem: number,
  //   product: string,
  // ) => {
  //   const detail = await equipmentCache.getEquipmentDetail(
  //     equipment,
  //     equipmentItem,
  //     product,
  //   );

  //   if (detail) {
  //     setDisplayData(detail);
  //   }
  // }

  // const initLoadTabData = async (
  //   equipment: number,
  //   equipmentItem: number,
  //   product: string,
  //   userType: UserTypeEnum,
  // ) => {
  //   const {
  //     language,
  //     businessPartner,
  //     emailAddress,
  //   }: AuthedUser = getLocalStorage('auth');

  //   await setFormDataForPage(
  //     equipment,
  //     equipmentItem,
  //     product,
  //   );

  //   dispatch(setLoading({ isOpen: true }));

  //   const detailResponse = await equipmentCache.updateEquipmentDetail({
  //     userType,
  //     equipment,
  //     equipmentItem,
  //     product,
  //     language,
  //     businessPartner,
  //     emailAddress,
  //   });

  //   setDisplayData(detailResponse);

  //   const paginationResponse = await readsPagination({
  //     userType,
  //     equipment,
  //     equipmentItem,
  //     product,
  //     language,
  //     businessPartner,
  //     userId: emailAddress,
  //   });

  //   dispatch(setLoading({ isOpen: false }));

  //   setPaginationData({
  //     ...paginationArrow(
  //       paginationResponse.equipmentDetailPagination.Paginations,
  //       equipmentItem,
  //       'equipment'
  //     ),
  //     userType,
  //   });
  // }

  // useEffect(() => {
  //   initLoadTabData(
  //     data.equipment,
  //     data.equipmentItem,
  //     data.product,
  //     data.userType,
  //   );
  // }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 設備詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'設備詳細を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.BusinessPartner]: UserTypeEnum.BusinessPartner,
            }
          )}
        />

        {displayData &&
          <Content
            // data={displayData}
            // paginationData={paginationData}
          />}
      </Main>
      <Footer hrefPath={`/equipment/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    equipment,
    userType
  } = context.query;

  return {
    props: {
      equipment,
      userType,
    }
  }
}

export default EquipmentDetail;
