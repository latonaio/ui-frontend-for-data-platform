import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  ListHeaderInfoTop,
  ListHeaderInfoBottom,
  ListHeaderInfo,
} from '../List/List.style';
import { UserTypeEnum, QuotationsTablesEnum } from '@/constants';
import { QuotationsDetailListItem, QuotationsDetailListHeader } from '@/constants';
import { clickHandler, summaryHead } from '../List/List';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/quotations/detail/[userType]/[quotations]';
import { toLowerCase } from '@/helpers/common';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { texts } from '@/constants/message';
import { BackButton, BlueButton } from '@/components/Button';

export interface QuotationsDetailListProps {
  className?: string;
  userType: string;
  data: {
    quotationsDetailListItem?: QuotationsDetailListItem[];
    quotationsDetailListHeader?: QuotationsDetailListHeader;
  };
  formData: formData;
  onUpdateItem: any;
}

interface DetailListTableElementProps {
  userType: string;
  summary: string[];
  list: QuotationsDetailListItem[];
  formData: formData;
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
  userType,
  summary,
  list,
  formData,
  onUpdateItem,
}: DetailListTableElementProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listType = QuotationsTablesEnum.quotationsListDetailListItem;

  const renderList = (list: QuotationsDetailListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr
            key={index}
            className={`record`}
            onClick={() => {
              clickHandler(
                `/price-master/detail/list/${toLowerCase(UserTypeEnum.BusinessPartner)}/${
                  item.Quotation
                }`,
                router,
              );
            }}
          >
            <td>{item.OrderItem}</td>
            <td>{item.Product}</td>
            <td>{item.OrderItemTextByBuyer}||{item.OrderItemTextBySeller}</td>
            <td>{item.OrderQuantityInDeliveryUnit}</td>
            <td>{item.ConditionRateValue}</td>
            <td>{item.RequestedDeliveryDate}</td>
            <td>{item.NetAmount}</td>
            {/* <td>{ボタン}</td> */}
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
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
									Quotation: {
										Quotation: item.Quotation,
                                    IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                  },
                                  accepter: ['Header']
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
      <DetailListTable>
        <tbody>
          {summaryHead(summary)}
          {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const QuotationsDetailList = ({
                                        userType,
                                        data,
                                        className,
                                        formData,
										onUpdateItem,
                                      }: QuotationsDetailListProps) => {
  //   const [paymentTermsEdit, setPaymentTermsEdit] = useState(false);
  const [transactionCurrencyEdit, setTransactionCurrencyEdit] = useState(false);

  const summary = [
    '見積明細番号',
    '品目コード',
	'明細テキスト',
    '数量',
    '数量単位',
    '単価',
    '納入日付',
    '正味金額',
	''
  ];

  return (
    <ListElement className={clsx(`List`, className)}>
      <div>
        <ListHeaderInfo className={'flex justify-end'}>
          <div className={'columnLeft mr-0'}>
            <ListHeaderInfoTop className={'flex justify-start text-xl'}>
              <div>
                <span>見積番号: </span>
              </div>
              <div>
                <span>見積日付: </span>
              </div>
              <div>
                <span>支払い条件: </span>
              </div>
              <div>
                <span>支払い方法: </span>
              </div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
            <div>
                <span>通貨: </span>
              </div>
              <div>
                <span>見積タイプ: </span>
              </div>
              <div>
                <span>Buyer: </span>
              </div>
              <div>
                <span>Seller: </span>
              </div>
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
        list={formData[QuotationsTablesEnum.quotationsListDetailListItem] || []}
        formData={formData}
		onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};

