import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  HeadTab,
  DetailList,
  DetailListTable,
  IcnOutside,
  IcnInvoice,
  ListHeaderInfo,
  ListHeaderInfoTop,
  ListHeaderInfoBottom,
  NoImage,
} from './List.style';
import {
  EquipmentTablesEnum,
  EquipmentItem,
  UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { PublicImage } from '@/components/Image';
import { Checkbox, BlueButton } from '@/components/Button';
import { dialogState, setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { formData, onUpdateItem } from '@/pages/equipment/list';
import { generateImageEquipmentUrl, generateImageProductUrl, toLowerCase } from '@/helpers/common';
import { rem } from 'polished';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { texts } from '@/constants/message';

interface ListProps {
  className?: string;
  formData: formData;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: EquipmentTablesEnum;
  display: EquipmentTablesEnum;
  list: EquipmentItem[];
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
                                  onUpdateItem,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = EquipmentTablesEnum.equipmentListBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: EquipmentItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/equipment/detail/${toLowerCase(UserTypeEnum.BusinessPartner)}/${item.Equipment}`,
              router,
            );
          }}>
            <td>
              {item.Images?.Equipment && (
                <img
                  className={'m-auto'}
                  style={{
                    width: rem(60),
                  }}
                  src={item.Images &&
                    generateImageProductUrl(item.Images?.Equipment?.BusinessPartnerID ? item.Images?.Equipment?.BusinessPartnerID.toString() : null,
                      item.Images?.Equipment)}
                  alt={`${item.EquipmentName}`}
                />
              )}

              {/*generateImageProductUrl(data.businessPartner ? data.businessPartner.toString() : null, data.productImage)}*/}
              {!item.Images?.Equipment && (
                <NoImage>
                  <div>No</div>
                  <div>Image</div>
                </NoImage>
              )}
            </td>
            <td>{item.Equipment}</td>
            <td>{item.EquipmentName}</td>
            <td>{item.EquipmentTypeName}</td>
            <td>{item.PlantName}</td>
            <td>{item.ValidityStartDate}</td>
            <td>
              <div>
                <BlueButton
                  isFinished={item.IsMarkedForDeletion}
                  className={'size-relative'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    e.preventDefault();

                    dispatch(setDialog({
                      type: 'consent',
                      consent: {
                        isOpen: true,
                        children: (
                          cancelDialogTemplate(
                            dispatch,
                            item.IsMarkedForDeletion ?
                              '設備情報を削除を取り消しますか？' : '設備情報を削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  EquipmentMaster: {
                                    Equipment: item.Equipment,
                                    IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                  },
                                  accepter: ['General']
                                },
                                listType,
                                'delete',
                              );
                            },
                          )
                        ),
                      }
                    }));
                  }}
                >
                  {texts.button.delete}
                </BlueButton>
              </div>
            </td>
          </tr>
        )
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={7}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  }

  return (
    <DetailList
      className={`${type === display ? '' : 'hidden'}`}
    >
      <DetailListTable className={'equipmentionOrderList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}
export const EquipmentList = ({
                                      formData,
                                      className,
                                      onUpdateItem,
                                    }: ListProps) => {
  const [display, setDisplay] = useState<EquipmentTablesEnum>(
    EquipmentTablesEnum.equipmentListBusinessPartnerItem,
  );
  const summary = [
    '設備画像',
    '設備',
    '設備名称',
    '設備タイプ名称',
    '保全プラント',
    '有効開始日付',
    '',
  ];

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <DetailListTableElement
        summary={summary}
        type={EquipmentTablesEnum.equipmentListBusinessPartnerItem}
        display={display}
        list={formData[EquipmentTablesEnum.equipmentListBusinessPartnerItem] || []}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};


