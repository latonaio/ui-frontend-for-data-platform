import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  ListHeaderInfo,
  ListHeaderInfoTop,
  ListHeaderInfoBottom,
  NoImage,
} from '../List/List.style';
import { BackButton, GreenButton } from '@/components/Button';
import {
  OperationsTablesEnum,
  OperationsDetailListItem,
  OperationsDetailHeader,
  UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from '../List/List';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { formData } from '@/pages/operations/detail/list/[userType]/[operations]';
import { texts } from '@/constants/message';


export interface OperationsDetailListProps {
  className?: string;
  userType: string;
  operations: number;
  data: {
    businessPartner?: number;
    operationsDetailListItem?: OperationsDetailListItem[];
    operationsDetailHeader?: OperationsDetailHeader;
  };
  formData: formData;
}

interface DetailListTableElementProps {
  userType: string;
  operations: number;
  summary: string[];
  businessPartner?: number;
  list: OperationsDetailListItem[];
  formData: formData;
}

const DetailListTableElement = ({
                                  userType,
                                  operations,
                                  summary,
                                  businessPartner,
                                  list,
                                  formData,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const renderList = (list: OperationsDetailListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              `/production-order/detail/${item.OperationsItem}/${userType}`,
              router
            );
          }}>
            <td>{item.OperationsItem}</td>
            <td>{item.OperationsText}</td>
            <td>{item.ProductionPlantName}</td>
            <td>{item.StandardLotSizeQuantity}</td>
            <td>{item.OperationsUnit}</td>
            <td>{item.ValidityStartDate}</td>
            <td>{item.IsMarkedForDeletion}</td>
            <td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
                <GreenButton
                  className={'size-relative'}
                  isFinished={item.IsMarkedForDeletion}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    e.preventDefault();

                    if (item.IsMarkedForDeletion) { return; }
                  }}
                >
                  {texts.button.cancel}
                </GreenButton>
                {/*<i*/}
                {/*  className="icon-schedule"*/}
                {/*  style={{*/}
                {/*    fontSize: rem(32),*/}
                {/*  }}*/}
                {/*/>*/}
              </div>
            </td>
          </tr>
        );
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={9}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  };

  return (
    <DetailList>
      <DetailListTable className={''}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const OperationsDetailList = ({
                                            userType,
                                            operations,
                                            data,
                                            className,
                                            formData,
                                          }: OperationsDetailListProps) => {
  const summary = [
    '作業手順明細番号',
    '品目',
    '作業手順テキスト',
    'プラント',
    '標準ロットサイズ数量',
    '作業数量単位',
    '有効開始日付',
    '',
  ];

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <div>
        <ListHeaderInfo className={'flex justify-end'}>
          <div className={'columnLeft'}>
            <ListHeaderInfoTop className={'flex justify-start text-xl'}>
              <div>作業手順: {data.operationsDetailHeader?.Operations}</div>
              <div> 有効開始日付: {data.operationsDetailHeader?.ValidityStartDate} {data.operationsDetailHeader?.ValidityStartDate}</div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
              <div>オーナープラント: {data.operationsDetailHeader?.OperationsStatus}</div>
              <div>品目テキスト: {data.operationsDetailHeader?.OperationsText}</div>
            </ListHeaderInfoBottom>
          </div>
          <div className={'columnRight'}>
            <BackButton className={'whiteInfo text-sm'}>その他の情報</BackButton>
          </div>
        </ListHeaderInfo>
      </div>
      <DetailListTableElement
        userType={userType}
        summary={summary}
        operations={operations}
        businessPartner={data.businessPartner}
        list={formData[OperationsTablesEnum.operationsDetailList] || []}
        formData={formData}
      />
    </ListElement>
  );
};



