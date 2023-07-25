import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  ListHeaderInfoTop,
  ListHeaderInfo,
} from '../List/List.style';
import { UserTypeEnum, PriceMasterTablesEnum } from '@/constants';
import { PriceMasterDetailListItem, PriceMasterDetailHeader } from '@/constants';
import { clickHandler, summaryHead } from '../List/List';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/price-master/detail/list/[userType]/[supplyChainRelationshipId]';
import { toLowerCase } from '@/helpers/common';
import { BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { texts } from '@/constants/message';

export interface PriceMasterDetailListProps {
  className?: string;
  userType: string;
  data: {
    priceMasterDetailListItem?: PriceMasterDetailListItem[];
    priceMasterDetailHeader?: PriceMasterDetailHeader;
  };
  formData: formData;
  onUpdateItem: any;
}

interface DetailListTableElementProps {
  userType: string;
  summary: string[];
  list: PriceMasterDetailListItem[];
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
  const listType = PriceMasterTablesEnum.priceMasterDetailListItem;

  const renderList = (list: PriceMasterDetailListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr
            key={index}
            className={`record`}
            onClick={() => {
              clickHandler(
                `/price-master/detail/list/${toLowerCase(UserTypeEnum.BusinessPartner)}/${
                  item.SupplyChainRelationshipID
                }`,
                router,
              );
            }}
          >
            <td>{item.Product}</td>
            <td>{item.ProductDescription}</td>
            <td>{item.ConditionType}</td>
            <td>{item.ConditionRateValue}</td>
            <td>{item.ConditionRateValueUnit}</td>
            <td>{item.ConditionScaleQuantity}</td>
            <td>{item.ConditionCurrency}</td>
            <td>{item.ConditionRecord}</td>
            <td>{item.ConditionSequentialNumber}</td>
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
                              '価格マスターの削除を取り消しますか？' : '価格マスターを削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
									SupplyChainRelationshipID: {
                                    SupplyChainRelationshipID: item.SupplyChainRelationshipID,
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

export const PriceMasterDetailList = ({
                                        userType,
                                        data,
                                        className,
                                        formData,
										onUpdateItem,
                                      }: PriceMasterDetailListProps) => {
  //   const [paymentTermsEdit, setPaymentTermsEdit] = useState(false);
  const [transactionCurrencyEdit, setTransactionCurrencyEdit] = useState(false);

  const summary = [
    '品目',
    '品目テキスト',
	'条件タイプ',
    '条件レート値',
    '条件レート値単位',
    '条件スケール数量',
    '条件通貨',
    '条件レコード',
    '条件連続番号',
	''
  ];

  return (
    <ListElement className={clsx(`List`, className)}>
      <div>
        <ListHeaderInfo className={'flex justify-end'}>
          <div className={'columnLeft'}>
            <ListHeaderInfoTop className={'flex justify-start text-xl'}>
              <div>
                <span>SCR: {data[PriceMasterTablesEnum.priceMasterDetailHeader]?.SupplyChainRelationshipID}</span>
              </div>
              <div
                className={'editMenu'}
                onClick={() => {
                  setTransactionCurrencyEdit(!transactionCurrencyEdit);
                }}
              ></div>
              <div>Buyer: {data[PriceMasterTablesEnum.priceMasterDetailHeader]?.BuyerName}</div>
              <div>Seller: {data[PriceMasterTablesEnum.priceMasterDetailHeader]?.SellerName}</div>
            </ListHeaderInfoTop>
          </div>
        </ListHeaderInfo>
      </div>
      <DetailListTableElement
        userType={userType}
        summary={summary}
        list={formData[PriceMasterTablesEnum.priceMasterDetailList] || []}
        formData={formData}
		onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};

