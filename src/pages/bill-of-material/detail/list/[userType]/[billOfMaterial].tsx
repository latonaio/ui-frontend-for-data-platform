import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { BillOfMaterialDetailList as Content } from '@/components/Content';
import { AuthedUser,
  BillOfMaterialTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toUpperCase } from '@/helpers/common';
import { getSearchTextDescription } from '@/helpers/pages';
import { billOfMaterialCache } from '@/services/cacheDatabase/billOfMaterial';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { rem } from 'polished';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/bill-of-material/detail-list';

interface PageProps {
  billOfMaterial: number;
  userType: string;
}

const BillOfMaterialDetailList: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (billOfMaterial: number, userType: string) => {
    const list = await billOfMaterialCache.getBillOfMaterialDetailList(billOfMaterial, userType);

    appDispatch(initializeUpdate({
      [BillOfMaterialTablesEnum.billOfMaterialDetailList]: list[BillOfMaterialTablesEnum.billOfMaterialDetailList],
      [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]:
        list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader] ?
          list[BillOfMaterialTablesEnum.billOfMaterialDetailHeader] : {},
    }));
  }

  const initLoadTabData = async (billOfMaterial: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage(
      billOfMaterial,
      userType,
    );

    dispatch(setLoading({ isOpen: true }));

    await billOfMaterialCache.updateBillOfMaterialDetailList({
      billOfMaterial,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage(
      billOfMaterial,
      userType,
    );
  };

  useEffect(() => {
    initLoadTabData(data.billOfMaterial, data.userType);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 部品表明細一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'部品表明細一覧を照会しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.OwnerProductionPlantBusinessPartner]: [UserTypeEnum.OwnerProductionPlantBusinessPartner],
            },
          )}
        />
        <div style={{
          marginBottom: rem(20),
          textAlign: 'right'
        }}>
          <div
            className={'inline-flex justify-end items-center'}
            style={{
              fontSize: rem(13),
              color: '#48bdd7',
              cursor: 'pointer',
            }}
          >
            <i
              className="icon-retweet"
              style={{
                fontSize: rem(24),
              }}
              onClick={async () => {
                const {
                  language,
                  businessPartner,
                  emailAddress,
                }: AuthedUser = getLocalStorage('auth');

                dispatch(setLoading({ isOpen: true }));

                await Promise.all([
                  (async () => {
                    await billOfMaterialCache.updateBillOfMaterialDetailList({
                      billOfMaterial: data.billOfMaterial,
                      userType: data.userType,
                      language,
                      businessPartner,
                      emailAddress,
                    });
                  })(),

                ]);

                dispatch(setLoading({ isOpen: false }));
              }}
            />
            キャッシュの更新の実行
          </div>
          <div
            className={'inline- justify-end items-center'}
            style={{
              fontSize: rem(13),
              cursor: 'pointer',
              color: '#4865d7',
            }}
          >
            <i
              className="icon-refresh"
              style={{
                fontSize: rem(24),
              }}
              onClick={async () => {
                await initLoadTabData(data.billOfMaterial, data.userType);
              }}
            />
            描画の実行
          </div>
        </div>
        <Content
          userType={data.userType}
          billOfMaterial={data.billOfMaterial}
        />
      </Main>
      <Footer hrefPath={`/bill-of-material/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { billOfMaterial, userType } = context.query;

  return {
    props: {
      billOfMaterial: Number(billOfMaterial),
      userType,
    }
  }
}

export default BillOfMaterialDetailList;
