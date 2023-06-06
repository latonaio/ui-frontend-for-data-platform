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
  OperationsTablesEnum,
  OperationsItem,
  UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { PublicImage } from '@/components/Image';
import { Checkbox, BlueButton } from '@/components/Button';
import { dialogState, setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { formData, onUpdateItem } from '@/pages/operations/list';
import { generateImageProductUrl, toLowerCase } from '@/helpers/common';
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
  type: OperationsTablesEnum;
  display: OperationsTablesEnum;
  list: OperationsItem[];
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
  const dispatch = useDispatch();
  const listType = OperationsTablesEnum.operationsListOwnerBusinessPartnerItem;
  const renderList = (list: OperationsItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            // clickHandler(
            //   `/operations/detail/exconf/list/${toLowerCase(UserTypeEnum.BusinessPartner)}/${item.Operations}`,
            //   router,
            // );
          }}>
            <td>
              {item.Images?.Operations && (
                <img
                  className={'m-auto'}
                  style={{
                    width: rem(60),
                  }}
                  src={item.Images && generateImageProductUrl(
                    item.Images?.Operations?.BusinessPartnerID ?
                      item.Images?.Operations?.BusinessPartnerID.toString() : null, item.Images?.Operations || {}
                  )}
                  alt={`${item.ProductDescription}`}
                />
              )}
              {!item.Images?.Operations && (
                <NoImage>
                  <div>No</div>
                  <div>Image</div>
                </NoImage>
              )}
            </td>
            <td>{item.Operations}</td>
            <td>{item.Product}</td>
            <td>{item.ProductDescription}</td>
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
                              '作業手順明細を削除を取り消しますか？' : '作業手順明細を削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  OperationsMaster: {
                                    Operations: item.Operations,
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
      <DetailListTable className={'operationsionOrderList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}
export const OperationsList = ({
                                      formData,
                                      className,
                                      onUpdateItem,
                                    }: ListProps) => {
  const [display, setDisplay] = useState<OperationsTablesEnum>(
    OperationsTablesEnum.operationsListOwnerBusinessPartnerItem,
  );
  const summary = [
    '品目画像',
    '作業手順',
    '品目コード',
    '品目名',
    'プラント',
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
        type={OperationsTablesEnum.operationsListOwnerBusinessPartnerItem}
        display={display}
        list={formData[OperationsTablesEnum.operationsListOwnerBusinessPartnerItem] || []}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};


