import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { SupplyChainRelationshipList as Content } from '@/components/Content';
import { AuthedUser, SupplyChainRelationshipBuyerItem, SupplyChainRelationshipTablesEnum, SupplyChainRelationshipSellerItem, UserTypeEnum } from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { supplyChainRelationshipCache } from '@/services/cacheDatabase/supplyChainRelationship';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { cancels, deletes } from '@/api/supplyChainRelationship';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';

interface PageProps {
}

interface editList {
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: TextFieldProps[];
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: TextFieldProps[];
}

export interface formData {
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: SupplyChainRelationshipBuyerItem[];
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: SupplyChainRelationshipSellerItem[];
  editList: editList;
}

const SupplyChainRelationshipList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem);
  const [formData, setFormData] = useState<formData | any>({});
  const [displayData, setDisplayData] = useState(UserTypeEnum.Buyer);

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await supplyChainRelationshipCache.getSupplyChainRelationshipList();

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list[SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem],
          [
            { keyName: SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem },
          ]
        ),
        ...createFormDataForEditingArray(
          list[SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem],
          [
            { keyName: SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem },
          ]
        ),
      },
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: list[SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem],
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: list[SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem],
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
        await supplyChainRelationshipCache.updateSupplyChainRelationshipList({
          language,
          businessPartner,
          emailAddress,
          userType: toLowerCase(UserTypeEnum.Buyer),
        });
      })(),
      (async () => {
        await supplyChainRelationshipCache.updateSupplyChainRelationshipList({
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

    supplyChainRelationshipCache.updateSupplyChainRelationshipList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.Buyer),
    });

    supplyChainRelationshipCache.updateSupplyChainRelationshipList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.Seller),
    });

    // supplyChainRelationshipCache.updateSupplyChainRelationshipDetailList({
    //   orderId: params.SupplyChainRelationship.OrderID,
    //   userType: displayData,
    //   language,
    //   businessPartner,
    //   emailAddress,
    // });

    const itemIdentification = params.SupplyChainRelationship.OrderID;

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
      <Header title={'データ連携基盤 Supply Chain Relationship Master 一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'サプライチェーンリレーションシップマスタ情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: UserTypeEnum.Buyer,
              [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: UserTypeEnum.Seller,
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
                    await supplyChainRelationshipCache.updateSupplyChainRelationshipList({
                      language,
                      businessPartner,
                      emailAddress,
                      userType: toLowerCase(UserTypeEnum.Buyer),
                    });
                  })(),
                  (async () => {
                    await supplyChainRelationshipCache.updateSupplyChainRelationshipList({
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
            onClickHandler={(toggleDisplayEnum: SupplyChainRelationshipTablesEnum) => {
              setSearchTextDescription(toggleDisplayEnum);
              toggleDisplayEnum === SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem ?
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

export default SupplyChainRelationshipList;
