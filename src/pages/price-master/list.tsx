import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { PriceMasterList as Content } from '@/components/Content';
import {
  AuthedUser,
  PriceMasterBuyerItem,
  PriceMasterTablesEnum,
  PriceMasterSellerItem,
  UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { priceMasterCache } from '@/services/cacheDatabase/priceMaster';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { cancels, deletes } from '@/api/priceMaster';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';

interface PageProps {
}

interface editList {
  [PriceMasterTablesEnum.priceMasterListBuyerItem]: TextFieldProps[];
  [PriceMasterTablesEnum.priceMasterListSellerItem]: TextFieldProps[];
}

export interface formData {
  [PriceMasterTablesEnum.priceMasterListBuyerItem]: PriceMasterBuyerItem[];
  [PriceMasterTablesEnum.priceMasterListSellerItem]: PriceMasterSellerItem[];
  editList: editList;
}

const PriceMasterList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(PriceMasterTablesEnum.priceMasterListBuyerItem);
  const [formData, setFormData] = useState<formData | any>({});
  const [displayData, setDisplayData] = useState(UserTypeEnum.Buyer);

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await priceMasterCache.getPriceMasterList();
    
    const map = new Map(list[PriceMasterTablesEnum.priceMasterListBuyerItem].map(o => [o.SupplyChainRelationshipID, o]));

    // console.log(Array.from(map.values()));
	const buyer = Array.from(map.values());

	const map_1 = new Map(list[PriceMasterTablesEnum.priceMasterListSellerItem].map(o => [o.SupplyChainRelationshipID, o]));

    // console.log(Array.from(map.values()));
	const seller = Array.from(map.values());

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list[PriceMasterTablesEnum.priceMasterListBuyerItem],
          [
            { keyName: PriceMasterTablesEnum.priceMasterListBuyerItem },
          ],
        ),
        ...createFormDataForEditingArray(
          list[PriceMasterTablesEnum.priceMasterListSellerItem],
          [
            { keyName: PriceMasterTablesEnum.priceMasterListSellerItem },
          ],
        ),
      },
      [PriceMasterTablesEnum.priceMasterListBuyerItem]: buyer,
      [PriceMasterTablesEnum.priceMasterListSellerItem]: seller,
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
        await priceMasterCache.updatePriceMasterList({
          language,
          businessPartner,
          emailAddress,
          userType: toLowerCase(UserTypeEnum.Buyer),
        });
      })(),
      (async () => {
        await priceMasterCache.updatePriceMasterList({
          language,
          businessPartner,
          emailAddress,
          userType: toLowerCase(UserTypeEnum.Seller),
        });
      })(),
    ]);

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage();
  }

  const onCancelItem = async (
    value: any,
    updateItemIndex: number,
    updateItemKey: string,
    params: any,
    listType: string,
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

    if (updateItemKey === 'IsCancelled') {
      await cancels({
        ...params,
        business_partner: businessPartner,
        accepter: accepter(params).accepter,
      });
    }

    if (updateItemKey === 'IsMarkedForDeletion') {
      await deletes({
        ...params,
        business_partner: businessPartner,
        accepter: accepter(params).accepter,
      });
    }

    priceMasterCache.updatePriceMasterList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.Buyer),
    });

    priceMasterCache.updatePriceMasterList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.Seller),
    });

    // priceMasterCache.updatePriceMasterDetailList({
    //   orderId: params.PriceMaster.OrderID,
    //   userType: displayData,
    //   language,
    //   businessPartner,
    //   emailAddress,
    // });

    const itemIdentification = params.PriceMaster.OrderID;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.OrderID === itemIdentification) {
            return {
              ...item,
              [updateItemKey]: value,
            }
          }
          return { ...item }
        })
      ],
      editList: {
        ...formData.editList,
        [listType]: [
          ...formData.editList[listType].map((item: any, index: number) => {
            return {
              isEditing: index === updateItemIndex ? !item.isEditing : item.isEditing,
            };
          })
        ]
      }
    };

    setFormData(updateData);

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'価格マスタ一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'価格マスタ情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [PriceMasterTablesEnum.priceMasterListBuyerItem]: UserTypeEnum.Buyer,
              [PriceMasterTablesEnum.priceMasterListSellerItem]: UserTypeEnum.Seller,
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
                    await priceMasterCache.updatePriceMasterList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.Buyer),
                    });
                  })(),
                  (async () => {
                    await priceMasterCache.updatePriceMasterList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.Seller),
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
            onClickHandler={(toggleDisplayEnum: PriceMasterTablesEnum) => {
              setSearchTextDescription(toggleDisplayEnum);
              toggleDisplayEnum === PriceMasterTablesEnum.priceMasterListBuyerItem ?
                setDisplayData(UserTypeEnum.Buyer) : setDisplayData(UserTypeEnum.Seller);
            }}
            onCancelItem={onCancelItem}
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

export default PriceMasterList;
