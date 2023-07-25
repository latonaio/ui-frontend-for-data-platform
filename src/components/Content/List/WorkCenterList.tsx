import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
} from './List.style';
import {
  WorkCenterTablesEnum,
  WorkCenterItem,
  UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/work-center/list';
import { toLowerCase } from '@/helpers/common';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { texts } from '@/constants/message';

interface ListProps {
  className?: string;
  formData: formData;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: WorkCenterTablesEnum;
  display: WorkCenterTablesEnum;
  list: WorkCenterItem[];
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
  const listType = WorkCenterTablesEnum.workCenterListBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: WorkCenterItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/work-center/detail/${toLowerCase(UserTypeEnum.BusinessPartner)}/${item.WorkCenter}`,
              router,
            );
          }}>
            
            <td>{item.WorkCenter}</td>
            <td>{item.PlantName}</td>
            <td>{item.WorkCenterName}</td>
            <td>{item.WorkCenterLocation}</td>
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
                              '品目を削除を取り消しますか？' : '品目を削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  EquipmentMaster: {
                                    Equipment: item.WorkCenter,
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
export const WorkCenter = ({
                                      formData,
                                      className,
                                      onUpdateItem,
                                    }: ListProps) => {
  const [display, setDisplay] = useState<WorkCenterTablesEnum>(
    WorkCenterTablesEnum.workCenterListBusinessPartnerItem,
  );
  const summary = [
    '作業区',
    'プラント',
    '作業区名',
    '作業区ロケーション',
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
        type={WorkCenterTablesEnum.workCenterListBusinessPartnerItem}
        display={display}
        list={formData[WorkCenterTablesEnum.workCenterListBusinessPartnerItem] || []}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};


