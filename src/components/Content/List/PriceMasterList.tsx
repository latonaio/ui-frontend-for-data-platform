import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  HeadTab,
  DetailList,
  DetailListTable,
} from './List.style';
import { PriceMasterBuyerItem, PriceMasterSellerItem } from '@/constants';
import { PriceMasterTablesEnum, } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useDispatch } from 'react-redux';
import { formData } from '@/pages/price-master/list';
interface onCancelItem {
  (
    value: any,
    index: number,
    itemType: string,
    params: any,
    listType: string,
  ): void;
}


interface ListProps {
  className?: string;
  formData: formData;
  onClickHandler: (type: PriceMasterTablesEnum) => void;
  onCancelItem: onCancelItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: PriceMasterTablesEnum;
  display: PriceMasterTablesEnum;
  list: PriceMasterSellerItem[] | PriceMasterBuyerItem[];
  onCancelItem: onCancelItem;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
}: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = display === PriceMasterTablesEnum.priceMasterListBuyerItem ?
    PriceMasterTablesEnum.priceMasterListBuyerItem :
    PriceMasterTablesEnum.priceMasterListSellerItem;
  const dispatch = useDispatch();

  const renderList = (list: PriceMasterBuyerItem[] | PriceMasterSellerItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record`} onClick={() => {
            clickHandler(
              `/price-master/detail/list/${display === PriceMasterTablesEnum.priceMasterListBuyerItem ? 'buyer' : 'seller'}/${item.SupplyChainRelationshipID}`,
              router,
            );
          }}>
            <td>{item.SupplyChainRelationshipID}</td>
            <td>{item.BuyerName}</td>
            <td>{item.SellerName}</td>
          </tr>
        )
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={3}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  }

  return (
    <DetailList
      className={`${type === display ? '' : 'hidden'}`}
    >
      <DetailListTable>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}

export const PriceMasterList = ({
                             formData,
                             onClickHandler,
                             className,
                             onCancelItem,
                           }: ListProps) => {
  const summaryData = {
    [PriceMasterTablesEnum.priceMasterListBuyerItem]: ['サプライチェーンリレーションシップコード', 'Buyer', 'Seller', ''],
    [PriceMasterTablesEnum.priceMasterListSellerItem]: ['サプライチェーンリレーションシップコード', 'Buyer', 'Seller', '']
  };

  const [display, setDisplay] = useState<PriceMasterTablesEnum>(PriceMasterTablesEnum.priceMasterListBuyerItem);
  const [summary, setSummary] = useState<string[]>(summaryData[PriceMasterTablesEnum.priceMasterListBuyerItem]);
  const tabClickHandler = (type: PriceMasterTablesEnum) => {
    setDisplay(type);
    onClickHandler(type);
  }

  useEffect(() => {
    setSummary(summaryData[
      display === PriceMasterTablesEnum.priceMasterListBuyerItem ?
        PriceMasterTablesEnum.priceMasterListBuyerItem : PriceMasterTablesEnum.priceMasterListSellerItem
      ]);
  }, [display]);

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <div>
        <HeadTab className={'text-center text-1xl mb-2'}>
          <li
            className={`${display === PriceMasterTablesEnum.priceMasterListBuyerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(PriceMasterTablesEnum.priceMasterListBuyerItem)}
          >User = Buyer
          </li>
          <li
            className={`${display === PriceMasterTablesEnum.priceMasterListSellerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(PriceMasterTablesEnum.priceMasterListSellerItem)}
          >User = Seller
          </li>
        </HeadTab>
      </div>
      <DetailListTableElement
        summary={summary}
        type={PriceMasterTablesEnum.priceMasterListBuyerItem}
        display={display}
        list={formData[PriceMasterTablesEnum.priceMasterListBuyerItem] || []}
        onCancelItem={onCancelItem}
      />
      <DetailListTableElement
        summary={summary}
        type={PriceMasterTablesEnum.priceMasterListSellerItem}
        display={display}
        list={formData[PriceMasterTablesEnum.priceMasterListSellerItem] || []}
        onCancelItem={onCancelItem}
      />
    </ListElement>
  );
};
