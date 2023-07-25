import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  NoImage,
} from './List.style';
import {
  BillOfMaterialTablesEnum,
  BillOfMaterialListItem,
  UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { generateImageProductUrl, toLowerCase } from '@/helpers/common';
import { rem } from 'polished';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { texts } from '@/constants/message';
import { useAppSelector } from '@/store/hooks';

interface ListProps {
  className?: string;
}

interface DetailListTableElementProps {
  summary: string[];
  type: BillOfMaterialTablesEnum;
  display: BillOfMaterialTablesEnum;
  list: BillOfMaterialListItem[];
  userType: UserTypeEnum;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
                                  userType,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: BillOfMaterialListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/bill-of-material/detail/list/${userType}/${item.BillOfMaterial}`,
              router,
            );
          }}>
            <td>
              {item.Images?.Product && (
                <img
                  className={'m-auto'}
                  style={{
                    width: rem(60),
                  }}
                  src={item.Images &&
                    generateImageProductUrl(item.Images?.Product?.BusinessPartnerID ? item.Images?.Product?.BusinessPartnerID.toString() : null,
                      item.Images?.Product)}
                  alt={`${item.Product}`}
                />
              )}
              {!item.Images?.Product && (
                <NoImage>
                  <div>No</div>
                  <div>Image</div>
                </NoImage>
              )}
            </td>
            <td>{item.BillOfMaterial}</td>
            <td>{item.Product}</td>
            <td>{item.ProductDescription}</td>
            <td>{item.OwnerProductionPlantName}</td>
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
                              '部品表の削除を取り消しますか？' : '部品表を削除しますか？',
                            () => {
                              // onUpdateItem(
                              //   !item.IsMarkedForDeletion,
                              //   index,
                              //   'IsMarkedForDeletion',
                              //   {
                              //     BillOfMaterial: {
                              //       BillOfMaterial: item.BillOfMaterial,
                              //       IsMarkedForDeletion: !item.IsMarkedForDeletion,
                              //     },
                              //     accepter: ['Header']
                              //   },
                              //   listType,
                              //   'delete',
                              // );
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
export const BillOfMaterialList = ({
                                      className,
                                    }: ListProps) => {
  const [display, setDisplay] = useState<BillOfMaterialTablesEnum>(
    BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem
  );
  const summary = [
    '品目画像',
    '部品表',
    '品目コード',
    '品目名',
    'オーナー製造プラント',
    '有効開始日付',
    '',
  ];

  const list  = useAppSelector(state => state.billOfMaterialList) as {
    [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]: BillOfMaterialListItem[],
  };

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <DetailListTableElement
        summary={summary}
        type={BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem}
        display={display}
        userType={UserTypeEnum.OwnerProductionPlantBusinessPartner}
        list={list[BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem] || []}
      />
    </ListElement>
  );
};


