import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  ListHeaderInfoTop,
  ListHeaderInfoBottom,
  ListHeaderInfo,
} from './List.style';
import { BillOfMaterialTablesEnum, OrdersDetailHeader, OrdersTablesEnum } from '@/constants';
import { OrdersDetailListItem } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton, BlueButton, GreenButton } from '@/components/Button';
import {
  Select,
  DatePicker,
  TextField,
} from '@/components/Form';
import React, { useState } from 'react';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData, editList } from '@/pages/orders/detail/list/[userType]/[orderId]';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent/Consent';
import { texts } from '@/constants/message';
import { useAppSelector } from '@/store/hooks';
import { BillOfMaterialDetailHeader, BillOfMaterialDetailListItem } from '@/store/slices/bill-of-material/detail-list';

export interface OrdersDetailListProps {
  className?: string;
  userType: string;
  orderId: number;
}

interface DetailListTableElementProps {
  userType: string;
  orderId: number;
  summary: string[];
  list: OrdersDetailListItem[];
}

const DetailListTableElement = ({
                                  userType,
                                  orderId,
                                  summary,
                                  list,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const renderList = (
    list: OrdersDetailListItem[],
  ) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled || item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(`/orders/detail/${orderId}/${item.OrderItem}/${userType}/${item.Product}`, router);
          }}>
            <td>{item.OrderItem}</td>
            <td>{item.Product}</td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // if (editList.orderItemText[index].isEditing) {
                  //   return;
                  // }
                  // setEditList(index, 'orderItemText');
                }}
              >
                <TextField
                  // isEditing={editList.orderItemText[index]?.isEditing}
                  isEditing={false}
                  currentValue={item.OrderItemTextByBuyer || item.OrderItemTextBySeller}
                  onChange={(value: any) => {
                    // onUpdateOrderItem(
                    //   value,
                    //   index,
                    //   `${userType === 'buyer' ?
                    //     'OrderItemTextByBuyer' : 'OrderItemTextBySeller'
                    //   }`,
                    //   {
                    //     Orders: {
                    //       OrderID: orderId,
                    //       Item: [
                    //         {
                    //           OrderID: orderId,
                    //           OrderItem: item.OrderItem,
                    //           [userType === 'buyer' ?
                    //             'OrderItemTextByBuyer' : 'OrderItemTextBySeller'
                    //             ]: value,
                    //         },
                    //       ],
                    //     },
                    //   },
                    // );
                  }}
                  // onClose={}
                />
              </span>
            </td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // if (editList.orderQuantityInDeliveryUnit[index].isEditing) {
                  //   return;
                  // }
                  // setEditList(index, 'orderQuantityInDeliveryUnit');
                }}
              >
                <TextField
                  // isEditing={editList.orderQuantityInDeliveryUnit[index]?.isEditing}
                  isEditing={false}
                  currentValue={item.OrderQuantityInDeliveryUnit}
                  onChange={(value: any) => {
                    // onUpdateOrderItem(
                    //   value,
                    //   index,
                    //   'OrderQuantityInDeliveryUnit',
                    //   {
                    //     Orders: {
                    //       OrderID: orderId,
                    //       Item: [
                    //         {
                    //           OrderID: orderId,
                    //           OrderItem: item.OrderItem,
                    //           OrderQuantityInDeliveryUnit: Number(value),
                    //         },
                    //       ],
                    //     },
                    //   },
                    // );
                  }}
                  // onClose={}
                />
              </span>
            </td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // if (editList.deliveryUnit[index].isEditing) {
                  //   return;
                  // }
                }}
              >
                <Select
                  className={'isBlock'}
                  // isEditing={editList.deliveryUnit[index]?.isEditing}
                  isEditing={false}
                  currentValue={item.DeliveryUnit}
                  // select={formData?.quantityUnit?.select || {
                  select={{
                    data: [],
                    label: '',
                    value: '',
                  }}
                  onChange={(value) => {
                    // onUpdateOrderItem(
                    //   value,
                    //   index,
                    //   'DeliveryUnit',
                    //   {
                    //     Orders: {
                    //       OrderID: orderId,
                    //       Item: [
                    //         {
                    //           OrderID: orderId,
                    //           OrderItem: item.OrderItem,
                    //           DeliveryUnit: value,
                    //         },
                    //       ],
                    //     },
                    //   },
                    // );
                  }}
                ></Select>
              </span>
            </td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // if (editList.requestedDeliveryDate[index]?.isEditing) {
                  //   return;
                  // }
                  // setEditList(index, 'requestedDeliveryDate');
                }}
              >
                <DatePicker
                  className={'orderDateDataPicker'}
                  // isEditing={editList.requestedDeliveryDate[index]?.isEditing}
                  isEditing={false}
                  parseDateFormat={'yyyy-MM-dd'}
                  currentValue={item.RequestedDeliveryDate}
                  onChange={(value) => {
                    // onUpdateOrderItem(
                    //   value,
                    //   index,
                    //   'RequestedDeliveryDate',
                    //   {
                    //     Orders: {
                    //       OrderID: orderId,
                    //       Item: [
                    //         {
                    //           OrderID: orderId,
                    //           OrderItem: item.OrderItem,
                    //           RequestedDeliveryDate: value,
                    //           RequestedDeliveryTime: '00:00:00',
                    //         },
                    //       ],
                    //     },
                    //   },
                    // );
                  }}
                  // onClose={() => setEditList(index, 'requestedDeliveryDate', true)}
                />
              </span>
            </td>
            <td>{Number(item.NetAmount).toLocaleString()}</td>
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
                            item.IsCancelled ? 'オーダーのキャンセルを取り消しますか？' : 'オーダーをキャンセルしますか？',
                            () => {
                              // onUpdateOrderItem(
                              //   !item.IsCancelled,
                              //   index,
                              //   'IsCancelled',
                              //   {
                              //     Orders: {
                              //       OrderID: item.OrderID,
                              //       Item: [
                              //         {
                              //           OrderItem: item.OrderItem,
                              //           IsCancelled: !item.IsCancelled,
                              //         },
                              //       ],
                              //     },
                              //     accepter: ['Item'],
                              //   },
                              //   'cancel',
                              // );
                            },
                          )
                        ),
                      },
                    }));
                  }}
                >{texts.button.cancel}
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
                              // onUpdateOrderItem(
                              //   !item.IsMarkedForDeletion,
                              //   index,
                              //   'IsMarkedForDeletion',
                              //   {
                              //     Orders: {
                              //       OrderID: item.OrderID,
                              //       Item: [
                              //         {
                              //           OrderItem: item.OrderItem,
                              //           IsMarkedForDeletion: !item.IsMarkedForDeletion,
                              //         },
                              //       ],
                              //     },
                              //     accepter: ['Item'],
                              //   },
                              //   'delete',
                              // );
                            },
                          )
                        ),
                      },
                    }));
                  }}
                >{texts.button.delete}</BlueButton>
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

export const OrdersDetailList = ({
                                   userType,
                                   orderId,
                                   className,
                                 }: OrdersDetailListProps) => {
  const [paymentTermsEdit, setPaymentTermsEdit] = useState(false);
  const [paymentMethodEdit, setPaymentMethodEdit] = useState(false);
  const [transactionCurrencyEdit, setTransactionCurrencyEdit] = useState(false);
  const [orderDataEdit, setOrderDataEdit] = useState(false);

  const summary = [
    'オーダー明細番号',
    '品目コード',
    '明細テキスト',
    '数量',
    '入出荷単位',
    '納入日付',
    '正味金額',
    '',
  ];

  const list  = useAppSelector(state => state.ordersDetailList) as {
    [OrdersTablesEnum.ordersDetailHeader]: OrdersDetailHeader,
    [OrdersTablesEnum.ordersDetailList]: OrdersDetailListItem[],
  };

  return (
    <ListElement className={clsx(
      `List`,
      className,
    )}>
      <div>
        <ListHeaderInfo className={'flex justify-end'}>
          <div className={'columnLeft'}>
            <ListHeaderInfoTop className={'flex justify-start text-xl'}>
              <div>
                <span>オーダー番号: </span>
                {list[OrdersTablesEnum.ordersDetailHeader]?.OrderID}
              </div>
              <div
                className={'editMenu orderDateMenu'}
                onClick={(e: any) => {
                  e.stopPropagation();
                  e.preventDefault();

                  if (
                    !e.target.classList.value.includes('Mui') &&
                    e.target.classList.length > 0
                  ) {
                    setOrderDataEdit(!orderDataEdit);
                  }
                }}
              >
                <span className={'orderDateTitle'}>オーダー日付: </span>
                <DatePicker
                  className={'orderDateDataPicker'}
                  isEditing={orderDataEdit}
                  parseDateFormat={'yyyy-MM-dd'}
                  currentValue={list[OrdersTablesEnum.ordersDetailHeader]?.OrderDate}
                  onChange={(value) => {
                    // onUpdateOrderHeader(
                    //   value,
                    //   'orderDate',
                    //   {
                    //     Orders: {
                    //       OrderID: orderId,
                    //       OrderDate: value,
                    //     },
                    //   },
                    // );
                  }}
                  onClose={() => {
                    setOrderDataEdit(false);
                  }}
                />
              </div>
              <div
                className={'editMenu'}
                onClick={() => {
                  setPaymentTermsEdit(!paymentTermsEdit);
                }}
              >
                <span>支払条件: </span>
                <Select
                  isEditing={paymentTermsEdit}
                  currentValue={list[OrdersTablesEnum.ordersDetailHeader]?.PaymentTerms}
                  // select={formData?.paymentTerms?.select || {
                  select={{
                    data: [],
                    label: '',
                    value: '',
                  }}
                  onChange={(value) => {
                  }}
                ></Select>
              </div>
              <div
                className={'editMenu'}
                onClick={() => {
                  setPaymentMethodEdit(!paymentMethodEdit);
                }}
              >
                <span>支払方法: </span>
                <Select
                  isEditing={paymentMethodEdit}
                  currentValue={list[OrdersTablesEnum.ordersDetailHeader]?.PaymentMethod}
                  // select={formData?.paymentMethod?.select || {
                  select={{
                    data: [],
                    label: '',
                    value: '',
                  }}
                  onChange={(value) => {
                  }}
                ></Select>
              </div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
              <div
                className={'editMenu'}
                onClick={() => {
                  setTransactionCurrencyEdit(!transactionCurrencyEdit);
                }}
              >
                <span>通貨: </span>
                <Select
                  isEditing={transactionCurrencyEdit}
                  currentValue={list[OrdersTablesEnum.ordersDetailHeader]?.TransactionCurrency}
                  // select={formData?.transactionCurrency?.select || {
                  select={{
                    data: [],
                    label: '',
                    value: '',
                  }}
                  onChange={(value) => {
                  }}
                ></Select>
              </div>
              <div>
                <span>オーダータイプ: </span>
                {list[OrdersTablesEnum.ordersDetailHeader]?.OrderType}
              </div>
              <div>Buyer: {list[OrdersTablesEnum.ordersDetailHeader]?.BuyerName}</div>
              <div>Seller: {list[OrdersTablesEnum.ordersDetailHeader]?.SellerName}</div>
            </ListHeaderInfoBottom>
          </div>
          <div className={'columnRight'}>
            <BackButton className={'whiteInfo text-sm'}>その他の情報</BackButton>
            {/* "その他の情報"を押下した際に表示されるデータを以下に記載します。
            オーダーID: {ordersDetailHeader?.OrderID}
            オーダー日付: {ordersDetailHeader?.OrderDate}
            オーダータイプ: {ordersDetailHeader?.OrderType}
            SCRID: {ordersDetailHeader?.SupplyChainRelationshipID}
            SCR請求ID: {ordersDetailHeader?.SupplyChainRelationshipBillingID}
            SCRID支払ID: {ordersDetailHeader?.SupplyChainRelationshipPaymentID}
            請求先: {data.ordersDetailHeader?.BuyerName}
            請求元: {data.ordersDetailHeader?.SellerName}
            請求先国: {data.ordersDetailHeader?.BillToCountry}
            請求元国: {data.ordersDetailHeader?.BillFromCountry}
            支払人:{data.ordersDetailHeader?.PayerName}
            受取人: {data.ordersDetailHeader?.PayeeName}
            契約タイプ: {data.ordersDetailHeader?.ContractType}
            オーダー有効開始日付:{data.ordersDetailHeader?.OrderValidityStartDate}
            オーダー有効終了日付: {data.ordersDetailHeader?.OrderValidityEndDate}
            請求期間開始日付: {data.ordersDetailHeader?.InvoicePeriodStartDate}
            請求期間終了日付: {data.ordersDetailHeader?.InvoicePeriodEndDate}
            合計正味金額: {data.ordersDetailHeader?.TotalNetAmount}
            合計消費税額: {data.ordersDetailHeader?.TotalTaxAmount}
            合計総額: {data.ordersDetailHeader?.TotalGrossAmount}
            ヘッダ入出荷ステータス: {data.ordersDetailHeader?.HeaderDeliveryStatus}
            ヘッダ請求ステータス: {data.ordersDetailHeader?.HeaderBillingStatus}
            ヘッダ伝票参照ステータス: {data.ordersDetailHeader?.HeaderDocReferenceStatus}
            取引通貨: {ordersDetailHeader?.TransactionCurrency}
            価格設定日付: {data.ordersDetailHeader?.PricingDate}
            価格決定為替レート: {data.ordersDetailHeader?.PricingDetnExchangeRate}
            納入日付: {data.ordersDetailHeader?.RequestedDeliveryDate}
            納入時刻: {data.ordersDetailHeader?.RequestedDeliveryTime}
            ヘッダ入出荷完了ステータス: {data.ordersDetailHeader?.HeaderCompleteDeliveryIsDefined}
            インコタームズ: {data.ordersDetailHeader?.Incoterms}
            参照伝票: {data.ordersDetailHeader?.ReferenceDocument}
            参照伝票明細: {data.ordersDetailHeader?.ReferenceDocumentItem}
            勘定設定グループ: {data.ordersDetailHeader?.AccountAssignmentGroup}
            会計為替レート: {data.ordersDetailHeader?.AccountingExcangeRate}
            請求書日付: {data.ordersDetailHeader?.InvoiceDocumentRate}
            輸出入フラグ: {data.ordersDetailHeader?.IsExportImport}
            ヘッダテキスト: {data.ordersDetailHeader?.HeaderText}
            ヘッダブロックステータス: {data.ordersDetailHeader?.HeaderBlockStatus}
            ヘッダ入出荷ブロックステータス: {data.ordersDetailHeader?.HeaderDeliveryBlockStatus}
            ヘッダ請求ブロックステータス: {data.ordersDetailHeader?.HeaderBillingBlockStatus}
            登録日付: {data.ordersDetailHeader?.CreationDate}
            登録時刻: {data.ordersDetailHeader?.CreationTime}
            最終更新日付: {data.ordersDetailHeader?.LastChangeDate}
            最終更新時刻: {data.ordersDetailHeader?.LastChangeTime}
            キャンセルフラグ: {data.ordersDetailHeader?.IsCancelled}
            削除フラグ: {data.ordersDetailHeader?.IsMarkedForDeletion}
            */}
          </div>
        </ListHeaderInfo>
      </div>
      <DetailListTableElement
        userType={userType}
        summary={summary}
        orderId={orderId}
        list={list[OrdersTablesEnum.ordersDetailList] || []}
      />
    </ListElement>
  );
};
