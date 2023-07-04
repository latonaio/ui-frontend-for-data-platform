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
import { UserTypeEnum, PriceMasterTablesEnum } from '@/constants';
import { PriceMasterDetailListItem, PriceMasterDetailHeader } from '@/constants';
import { clickHandler, summaryHead } from '../List/List';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formData } from '@/pages/price-master/detail/list/[userType]/[supplyChainRelationshipId]';
import { toLowerCase } from '@/helpers/common';

export interface PriceMasterDetailListProps {
  className?: string;
  userType: string;
  data: {
    priceMasterDetailListItem?: PriceMasterDetailListItem[];
    priceMasterDetailHeader?: PriceMasterDetailHeader;
  };
  formData: formData;
}

interface DetailListTableElementProps {
  userType: string;
  summary: string[];
  list: PriceMasterDetailListItem[];
  formData: formData;
}

const DetailListTableElement = ({
  userType,
  summary,
  list,
  formData,
}: DetailListTableElementProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

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
      />
    </ListElement>
  );
};

