import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { PriceMasterDetailList as Content } from '@/components/Content';
import { AuthedUser, PriceMasterDetailListItem, PriceMasterTablesEnum, UserTypeEnum } from '@/constants';
import { getLocalStorage, toLowerCase, toUpperCase } from '@/helpers/common';
import { createFormDataForSelectObject, getSearchTextDescription } from '@/helpers/pages';
import { priceMasterCache } from '@/services/cacheDatabase/priceMaster';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { rem } from 'polished';
import { cancels, deletes, updates } from '@/api/priceMaster';


interface PageProps {
  supplyChainRelationshipId: number;
  userType: string;
}

export type onUpdateItem = (
	value: any,
	index: number,
	itemType: string,
	params: any,
	listType: string,
	apiType?: string,
  ) => void;

interface SelectProps {
  currentValue?: any;
  select: {
    data: any[];
    label: string;
    value: string;
  };
}

export interface editList {
  priceMasterItemText: TextFieldProps[];
  priceMasterQuantityInDeliveryUnit: TextFieldProps[];
  deliveryUnit: TextFieldProps[];
  conditionRateValue: TextFieldProps[];
  requestedDeliveryDate: TextFieldProps[];
}

export interface formData {
  paymentTerms: SelectProps;
  paymentMethod: SelectProps;
  transactionCurrency: SelectProps;
  orderDate: {
    currentValue: string,
  }
  quantityUnit: SelectProps;
  editList: editList;
  [PriceMasterTablesEnum.priceMasterDetailList]: PriceMasterDetailListItem[];
}

const PriceMasterDetailList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData | any>({});

  const setFormDataForPage = async (supplyChainRelationshipId: number, userType: string) => {
    const list = await priceMasterCache.getPriceMasterDetailList(supplyChainRelationshipId, userType);

    setFormData({
      ...createFormDataForSelectObject([]),
      editList: {},
      [PriceMasterTablesEnum.priceMasterDetailList]: list[PriceMasterTablesEnum.priceMasterDetailListItem] || [],
    });

    setDisplayData({
      userType,
      [PriceMasterTablesEnum.priceMasterDetailList]: list[PriceMasterTablesEnum.priceMasterDetailListItem] || [],
      [PriceMasterTablesEnum.priceMasterDetailHeader]: list[PriceMasterTablesEnum.priceMasterDetailHeader] || {},
    });
  }

  const initLoadTabData = async (supplyChainRelationshipId: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage(
      supplyChainRelationshipId,
      userType,
    );

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

    await priceMasterCache.updatePriceMasterDetailList({
      supplyChainRelationshipId,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    dispatch(setLoading({ isOpen: false }));

    await setFormDataForPage(
      supplyChainRelationshipId,
      userType,
    );
  };

  const onUpdateItem =async (
	value: any,
    updateItemIndex: number,
    updateItemKey: string,
    params: any,
    listType: string,
	operations: number,
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

		  const itemIdentification = params.OperationslMaster.Oeratins;

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

    // if (apiType !== 'cancel') {
    //   updateData.editList = {
    //     ...formData.editList,
    //     [listType]: [
    //       ...formData.editList[listType].map((item: any, index: number) => {
    //         return {
    //           isEditing: index === updateItemIndex ? !item.isEditing : item.isEditing,
    //         };
    //       })
    //     ]
    //   }
    // }

    setFormData(updateData);

    dispatch(setLoading({ isOpen: false }));
  }

  const dispatch = useDispatch();

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
    initLoadTabData(data.supplyChainRelationshipId, data.userType);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 価格マスタ一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'価格マスタ情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            toUpperCase(data.userType),
            {
              [UserTypeEnum.Buyer]: [UserTypeEnum.Buyer],
              [UserTypeEnum.Seller]: [UserTypeEnum.Seller],
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

                await priceMasterCache.updatePriceMasterDetailList({
                  supplyChainRelationshipId: data.supplyChainRelationshipId,
                  userType: data.userType,
                  language,
                  businessPartner,
                  emailAddress,
                });

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
                await initLoadTabData(data.supplyChainRelationshipId, data.userType);
              }}
            />
            描画の実行
          </div>
        </div>

        {/*<div>*/}
        {/*  <i*/}
        {/*    className="icon-refresh"*/}
        {/*    style={{*/}
        {/*      fontSize: rem(32),*/}
        {/*      cursor: 'pointer',*/}
        {/*    }}*/}
        {/*    onClick={async () => {*/}
        {/*      await initLoadTabData(data.orderId, data.userType);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</div>*/}
        {displayData && formData &&
          <Content
            data={displayData}
            formData={formData}
            userType={data.userType}
			onUpdateItem={onUpdateItem}
          />}
      </Main>
      <Footer hrefPath={`/price-master/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { supplyChainRelationshipId, userType } = context.query;

  return {
    props: {
      supplyChainRelationshipId: Number(supplyChainRelationshipId),
      userType,
    }
  }
}

export default PriceMasterDetailList;
