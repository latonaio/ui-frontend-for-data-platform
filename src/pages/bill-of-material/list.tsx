import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { BillOfMaterialList as Content } from '@/components/Content';
import {
  AuthedUser,
  BillOfMaterialListItem,
  UserTypeEnum,
  BillOfMaterialTablesEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { billOfMaterialCache } from '@/services/cacheDatabase/billOfMaterial';
import { getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';
import { initializeUpdate } from '@/store/slices/bill-of-material/list';
import { useAppDispatch } from '@/store/hooks';

interface PageProps {
}

export type onUpdateItem = (
  value: any,
  index: number,
  itemType: string,
  params: any,
  listType: string,
  apiType?: string,
) => void;

export interface editList {
  [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]: TextFieldProps[];
}

export interface formData {
  [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]: BillOfMaterialListItem[];
  editList: editList;
}

const BillOfMaterialList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(
    BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem
  );
  const [formData, setFormData] = useState<formData | any>({});

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async () => {
    const list = await billOfMaterialCache.getBillOfMaterialList();

    appDispatch(initializeUpdate({
      [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]:
        list[BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem],
    }));
  }

  const initLoadTabData = async () => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');
    await setFormDataForPage();

    dispatch(setLoading({ isOpen: true }));

    await billOfMaterialCache.updateBillOfMaterialList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner),
    });

    await setFormDataForPage();

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 部品表一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'部品表情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]:
              UserTypeEnum.OwnerProductionPlantBusinessPartner,
            }
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
                    await billOfMaterialCache.updateBillOfMaterialList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner),
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
                await initLoadTabData();
              }}
            />
            描画の実行
          </div>
        </div>
        <Content />
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
    }
  }
}

export default BillOfMaterialList;
