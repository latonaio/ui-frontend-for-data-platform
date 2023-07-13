import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { EquipmentList as Content } from '@/components/Content';
import {
  AuthedUser,
  EquipmentItem,
  UserTypeEnum,
  EquipmentTablesEnum,
} from '@/constants';
import { getLocalStorage, toLowerCase } from '@/helpers/common';
import { equipmentCache } from '@/services/cacheDatabase/equipment';
import { createFormDataForEditingArray, getSearchTextDescription } from '@/helpers/pages';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { TextFieldProps } from '@/components/Form';
import { deletes, updates } from '@/api/equipment';

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
  [EquipmentTablesEnum.equipmentListBusinessPartnerItem]: TextFieldProps[];
}

export interface formData {
  [EquipmentTablesEnum.equipmentListBusinessPartnerItem]: EquipmentItem[];
  editList: editList;
}

const EquipmentList: React.FC<PageProps> = (data) => {
  const [searchTextDescription, setSearchTextDescription] = useState(
    EquipmentTablesEnum.equipmentListBusinessPartnerItem
  );
  const [formData, setFormData] = useState<formData | any>({});

  const dispatch = useDispatch();

  const setFormDataForPage = async () => {
    const list = await equipmentCache.getEquipmentList();

    setFormData({
      editList: {
        ...createFormDataForEditingArray(
          list[EquipmentTablesEnum.equipmentListBusinessPartnerItem],
          [
            { keyName: EquipmentTablesEnum.equipmentListBusinessPartnerItem },
          ]
        ),
      },

      [EquipmentTablesEnum.equipmentListBusinessPartnerItem]:
        list[EquipmentTablesEnum.equipmentListBusinessPartnerItem],
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

    await equipmentCache.updateEquipmentList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BusinessPartner),
    });

    await setFormDataForPage();

    dispatch(setLoading({ isOpen: false }));

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

    equipmentCache.updateEquipmentList({
      language,
      businessPartner,
      emailAddress,
      userType: toLowerCase(UserTypeEnum.BusinessPartner),
    });

    const itemIdentification = params.EquipmentMaster.Equipment;

    const updateData = {
      ...formData,
      [listType]: [
        ...formData[listType].map((item: any, index: number) => {
          if (item.Equipment === itemIdentification) {
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

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 設備一覧'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop
          className={'ContentsTopNav'}
          title={'設備情報を確認しています'}
          searchTextDescription={getSearchTextDescription(
            searchTextDescription,
            {
              [EquipmentTablesEnum.equipmentListBusinessPartnerItem]:
              UserTypeEnum.BusinessPartner,
            }
          )}
        />
        {formData &&
          <Content
            formData={formData}
            onUpdateItem={onUpdateItem}
          />
        }
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

export default EquipmentList;
