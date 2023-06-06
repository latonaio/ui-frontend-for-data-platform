import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  HeadTab,
  DetailList,
  DetailListTable,
  IcnOutside,
  IcnInvoice,
} from './List.style';
import { GreenButton, BlueButton } from '@/components/Button';
import { BuyerItem, SellerItem } from '@/constants';
import { OrdersTablesEnum } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { PublicImage } from '@/components/Image';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData } from '@/pages/orders/list';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent';
import { texts } from '@/constants/message';
import { rem } from 'polished';

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
  onClickHandler: (type: OrdersTablesEnum) => void;
  onCancelItem: onCancelItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: OrdersTablesEnum;
  display: OrdersTablesEnum;
  list: SellerItem[] | BuyerItem[];
  onCancelItem: onCancelItem;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
                                  onCancelItem,
}: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = display === OrdersTablesEnum.ordersListBuyerItem ?
    OrdersTablesEnum.ordersListBuyerItem :
    OrdersTablesEnum.ordersListSellerItem;
  const dispatch = useDispatch();

  const renderList = (list: BuyerItem[] | SellerItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled || item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/orders/detail/list/${display === OrdersTablesEnum.ordersListBuyerItem ? 'buyer' : 'seller'}/${item.OrderID}`,
              router,
            );
          }}>
            <td>{item.OrderID}</td>
            <td>{item.BuyerName}</td>
            <td>{item.SellerName}</td>
            <td>{item.DeliveryStatus}</td>
            {/*<td className={'text-center'}>{item.invoiceStatus}</td>*/}
            {/*<td className={'text-center'}>{item.deliveryDate}</td>*/}
            <td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
                <GreenButton
                  className={'size-relative'}
                  isFinished={item.IsCancelled}
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
                            item.IsCancelled  ?
                              'オーダーのキャンセルを取り消しますか？' : 'オーダーをキャンセルしますか？',
                            () => {
                              onCancelItem(
                                !item.IsCancelled,
                                index,
                                'IsCancelled',
                                {
                                  Orders: {
                                    OrderID: item.OrderID,
                                    IsCancelled: !item.IsCancelled,
                                  }
                                },
                                listType,
                              );
                            },
                          )
                        ),
                      }
                    }));
                  }}
                >
                  {texts.button.cancel}
                </GreenButton>
                <BlueButton
                  className={'size-relative'}
                  isFinished={item.IsMarkedForDeletion}
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
                            item.IsMarkedForDeletion ? 'オーダーの削除を取り消しますか？' : 'オーダーを削除しますか？',
                            () => {
                              onCancelItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  Orders: {
                                    OrderID: item.OrderID,
                                    IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                  }
                                },
                                listType,
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
                {/*<i*/}
                {/*  className="icon-truck"*/}
                {/*  style={{*/}
                {/*    fontSize: rem(32),*/}
                {/*  }}*/}
                {/*/>*/}
                {/*<i*/}
                {/*  className="icon-invoice"*/}
                {/*  style={{*/}
                {/*    fontSize: rem(32),*/}
                {/*  }}*/}
                {/*/>*/}
              </div>
            </td>
          </tr>
        )
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={5}>テーブルに対象のレコードが存在しません。</td>
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

export const OrdersList = ({
                             formData,
                             onClickHandler,
                             className,
                             onCancelItem,
                           }: ListProps) => {
  const summaryData = {
    [OrdersTablesEnum.ordersListBuyerItem]: ['オーダー番号', 'Buyer', 'Seller', '入出荷ステータス', ''],
    [OrdersTablesEnum.ordersListSellerItem]: ['オーダー番号', 'Buyer', 'Seller', '入出荷ステータス', '',],
  };

  const [display, setDisplay] = useState<OrdersTablesEnum>(OrdersTablesEnum.ordersListBuyerItem);
  const [summary, setSummary] = useState<string[]>(summaryData[OrdersTablesEnum.ordersListBuyerItem]);
  const tabClickHandler = (type: OrdersTablesEnum) => {
    setDisplay(type);
    onClickHandler(type);
  }

  useEffect(() => {
    setSummary(summaryData[
      display === OrdersTablesEnum.ordersListBuyerItem ?
        OrdersTablesEnum.ordersListBuyerItem : OrdersTablesEnum.ordersListSellerItem
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
            className={`${display === OrdersTablesEnum.ordersListBuyerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(OrdersTablesEnum.ordersListBuyerItem)}
          >User ＝ Buyer
          </li>
          <li
            className={`${display === OrdersTablesEnum.ordersListSellerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(OrdersTablesEnum.ordersListSellerItem)}
          >User ＝ Seller
          </li>
        </HeadTab>
      </div>
      <DetailListTableElement
        summary={summary}
        type={OrdersTablesEnum.ordersListBuyerItem}
        display={display}
        list={formData[OrdersTablesEnum.ordersListBuyerItem] || []}
        onCancelItem={onCancelItem}
      />
      <DetailListTableElement
        summary={summary}
        type={OrdersTablesEnum.ordersListSellerItem}
        display={display}
        list={formData[OrdersTablesEnum.ordersListSellerItem] || []}
        onCancelItem={onCancelItem}
      />
    </ListElement>
  );
};
