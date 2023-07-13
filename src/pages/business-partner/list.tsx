import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { BusinessPartnerList as Content } from '@/components/Content';
import {
  AuthedUser,
  UserTypeEnum,
  BusinessPartnerTablesEnum,
  BusinessPartnerItem,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { businessPartnerCache } from '@/services/cacheDatabase/businessPartner';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { deletes, updates } from '@/api/businessPartner';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';
import { billOfMaterialCache } from '@/services/cacheDatabase/billOfMaterial';

interface PageProps {
}

interface editList {
  [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: TextFieldProps[];
}

export interface formData {
  [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: BusinessPartnerItem[];
  editList: editList;
}

const BusinessPartnerList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(
    BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem
  );
  const [formData, setFormData] = useState<formData | any>({});
  const [displayData, setDisplayData] = useState(UserTypeEnum.Buyer);

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await businessPartnerCache.getBusinessPartnerList();

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list[BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem],
          [
            { keyName: BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem },
          ]
        ),
      },
      [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: list[BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem],
    });
  }

  const initLoadTabData = async () => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage();

    dispatch(setLoading({ isOpen: true }));

    await Promise.all([
      (async () => {
        await businessPartnerCache.updateBusinessPartnerList({
          language,
          businessPartner,
          emailAddress,
          userType: toLowerCase(UserTypeEnum.BusinessPartner),
        });
      })(),
    ]);

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage();
  }

  const onUpdateItem = async (
    value: any,
    updateItemIndex: number,
    updateItemKey: string,
    params: any,
    listType: string,
    apiType: string = 'update',
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    const accepter = (params: any) => {
      if (!params.hasOwnProperty('accepter')) {
        return {
          ...params,
          accepter: ['Header'],
        };
      }

      return params;
    }

    if (apiType === 'delete') {
      await deletes({
        ...params,
        business_partner: businessPartner,
        accepter: accepter(params).accepter,
      });
    } else {
      await updates({
        ...params,
        accepter: accepter(params).accepter,
      });
    }

    businessPartnerCache.updateBusinessPartnerList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BusinessPartner),
    });

    const itemIdentification = params.BusinessPartner.businessPartner;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.BillOfMaterial === itemIdentification) {
            return {
              ...item,
              [updateItemKey]: value,
            }
          }
          return { ...item }
        })
      ],
    };

    setFormData(updateData);

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 ビジネスパートナー一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'ビジネスパートナー情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: UserTypeEnum.BusinessPartner,
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
                    await businessPartnerCache.updateBusinessPartnerList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.BusinessPartner),
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
        {formData &&
          <Content
            formData={formData}
            onClickHandler={(toggleDisplayEnum: BusinessPartnerTablesEnum) => {
              setSearchTextDescription(toggleDisplayEnum);
              setDisplayData(UserTypeEnum.BusinessPartner);
            }}
            onUpdateItem={onUpdateItem}
          />}
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

export default BusinessPartnerList;
