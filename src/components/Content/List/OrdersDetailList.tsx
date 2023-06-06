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
import { OrdersDetailHeader, OrdersTablesEnum } from '@/constants';
import { OrdersDetailListItem } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton, BlueButton, GreenButton } from '@/components/Button';
import {
  Select,
  DatePicker,
  TextField,
} from '@/components/Form';
import React, { useEffect, useState } from 'react';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData, editList } from '@/pages/orders/detail/list/[userType]/[orderId]';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent/Consent';
import { texts } from '@/constants/message';

export interface OrdersDetailListProps {
  className?: string;
  userType: string;
  orderId: number;
  data: {
    ordersDetailListItem?: OrdersDetailListItem[];
    ordersDetailHeader?: OrdersDetailHeader;
  };
  formData: formData;
  onUpdateOrderHeader: (
    value: any, updateHeaderKeyName: string, params: any,
  ) => void;
  setEditList: (value: any, key: string, isClose?: boolean) => void;
  onUpdateOrderItem: (
    value: any, index: number, itemType: string, params: any,
  ) => void;
}

interface DetailListTableElementProps {
  userType: string;
  orderId: number;
  summary: string[];
  list: OrdersDetailListItem[];
  editList: editList;
  setEditList: (value: any, key: string, isClose?: boolean) => void;
  onUpdateOrderItem: (
    value: any, index: number, itemType: string, params: any, aptType?: string,
  ) => void;
  formData: formData;
}

const DetailListTableElement = ({
                                  userType,
                                  orderId,
                                  summary,
                                  list,
                                  editList,
                                  setEditList,
                                  onUpdateOrderItem,
                                  formData,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const renderList = (
    list: OrdersDetailListItem[],
    editList: editList,
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
                  if (editList.orderItemText[index].isEditing) {
                    return;
                  }
                  setEditList(index, 'orderItemText');
                }}
              >
                <TextField
                  isEditing={editList.orderItemText[index]?.isEditing}
                  currentValue={item.OrderItemTextByBuyer || item.OrderItemTextBySeller}
                  onChange={(value: any) => {
                    onUpdateOrderItem(
                      value,
                      index,
                      `${userType === 'buyer' ?
                        'OrderItemTextByBuyer' : 'OrderItemTextBySeller'
                      }`,
                      {
                        Orders: {
                          OrderID: orderId,
                          Item: [
                            {
                              OrderID: orderId,
                              OrderItem: item.OrderItem,
                              [userType === 'buyer' ?
                                'OrderItemTextByBuyer' : 'OrderItemTextBySeller'
                                ]: value,
                            },
                          ],
                        },
                      },
                    );
                  }}
                  onClose={() => setEditList(index, 'orderItemText', true)}
                />
              </span>
            </td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (editList.orderQuantityInDeliveryUnit[index].isEditing) {
                    return;
                  }
                  setEditList(index, 'orderQuantityInDeliveryUnit');
                }}
              >
                <TextField
                  isEditing={editList.orderQuantityInDeliveryUnit[index]?.isEditing}
                  currentValue={item.OrderQuantityInDeliveryUnit}
                  onChange={(value: any) => {
                    onUpdateOrderItem(
                      value,
                      index,
                      'OrderQuantityInDeliveryUnit',
                      {
                        Orders: {
                          OrderID: orderId,
                          Item: [
                            {
                              OrderID: orderId,
                              OrderItem: item.OrderItem,
                              OrderQuantityInDeliveryUnit: Number(value),
                            },
                          ],
                        },
                      },
                    );
                  }}
                  onClose={() => setEditList(index, 'orderQuantityInDeliveryUnit', true)}
                />
              </span>
            </td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (editList.deliveryUnit[index].isEditing) {
                    return;
                  }
                  setEditList(index, 'deliveryUnit');
                }}
              >
                <Select
                  className={'isBlock'}
                  isEditing={editList.deliveryUnit[index]?.isEditing}
                  currentValue={item.DeliveryUnit}
                  select={formData?.quantityUnit?.select || {
                    data: [],
                    label: '',
                    value: '',
                  }}
                  onChange={(value) => {
                    onUpdateOrderItem(
                      value,
                      index,
                      'DeliveryUnit',
                      {
                        Orders: {
                          OrderID: orderId,
                          Item: [
                            {
                              OrderID: orderId,
                              OrderItem: item.OrderItem,
                              DeliveryUnit: value,
                            },
                          ],
                        },
                      },
                    );
                  }}
                ></Select>
              </span>
            </td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (editList.conditionRateValue[index].isEditing) {
                    return;
                  }
                  setEditList(index, 'conditionRateValue');
                }}
              >
                <TextField
                  isEditing={editList.conditionRateValue[index]?.isEditing}
                  currentValue={Number(item.ConditionRateValue).toLocaleString()}
                  onChange={(value: any) => {
                    onUpdateOrderItem(
                      value,
                      index,
                      'ConditionRateValue',
                      {
                        Orders: {
                          OrderID: orderId,
                          Item: [
                            {
                              OrderID: orderId,
                              OrderItem: item.OrderItem,
                              ItemPricingElement: [
                                {
                                  ConditionRateValue: Number(value),

                                },
                              ],
                            },
                          ],
                        },
                        accepter: ['ItemPricingElement'],
                      },
                    );
                  }}
                  onClose={() => setEditList(index, 'conditionRateValue', true)}
                />
              </span>
            </td>
            <td>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (editList.requestedDeliveryDate[index]?.isEditing) {
                    return;
                  }
                  setEditList(index, 'requestedDeliveryDate');
                }}
              >
                <DatePicker
                  className={'orderDateDataPicker'}
                  isEditing={editList.requestedDeliveryDate[index]?.isEditing}
                  parseDateFormat={'yyyy-MM-dd'}
                  currentValue={item.RequestedDeliveryDate}
                  onChange={(value) => {
                    onUpdateOrderItem(
                      value,
                      index,
                      'RequestedDeliveryDate',
                      {
                        Orders: {
                          OrderID: orderId,
                          Item: [
                            {
                              OrderID: orderId,
                              OrderItem: item.OrderItem,
                              RequestedDeliveryDate: value,
                              RequestedDeliveryTime: '00:00:00',
                            },
                          ],
                        },
                      },
                    );
                  }}
                  onClose={() => setEditList(index, 'requestedDeliveryDate', true)}
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
                              onUpdateOrderItem(
                                !item.IsCancelled,
                                index,
                                'IsCancelled',
                                {
                                  Orders: {
                                    OrderID: item.OrderID,
                                    Item: [
                                      {
                                        OrderItem: item.OrderItem,
                                        IsCancelled: !item.IsCancelled,
                                      },
                                    ],
                                  },
                                  accepter: ['Item'],
                                },
                                'cancel',
                              );
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
                              onUpdateOrderItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  Orders: {
                                    OrderID: item.OrderID,
                                    Item: [
                                      {
                                        OrderItem: item.OrderItem,
                                        IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                      },
                                    ],
                                  },
                                  accepter: ['Item'],
                                },
                                'delete',
                              );
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
        {renderList(list, editList)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const OrdersDetailList = ({
                                   userType,
                                   orderId,
                                   data,
                                   className,
                                   formData,
                                   onUpdateOrderHeader,
                                   setEditList,
                                   onUpdateOrderItem,
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
    '数量単位',
    '単価',
    '納入日付',
    '正味金額',
    '',
  ];

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
                {data.ordersDetailHeader?.OrderID}
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
                  currentValue={formData?.orderDate?.currentValue}
                  onChange={(value) => {
                    onUpdateOrderHeader(
                      value,
                      'orderDate',
                      {
                        Orders: {
                          OrderID: orderId,
                          OrderDate: value,
                        },
                      },
                    );
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
                  currentValue={formData?.paymentTerms?.currentValue}
                  select={formData?.paymentTerms?.select || {
                    data: [],
                    label: '',
                    value: '',
                  }}
                  onChange={(value) => {
                    onUpdateOrderHeader(
                      value,
                      'paymentTerms',
                      {
                        Orders: {
                          OrderID: orderId,
                          PaymentTerms: value,
                        },
                      },
                    );
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
                  currentValue={formData?.paymentMethod?.currentValue}
                  select={formData?.paymentMethod?.select || {
                    data: [],
                    label: '',
                    value: '',
                  }}
                  onChange={(value) => {
                    onUpdateOrderHeader(
                      value,
                      'paymentMethod',
                      {
                        Orders: {
                          OrderID: orderId,
                          PaymentMethod: value,
                        },
                      },
                    );
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
                  currentValue={formData?.transactionCurrency?.currentValue}
                  select={formData?.transactionCurrency?.select || {
                    data: [],
                    label: '',
                    value: '',
                  }}
                  onChange={(value) => {
                    onUpdateOrderHeader(
                      value,
                      'transactionCurrency',
                      {
                        Orders: {
                          OrderID: orderId,
                          TransactionCurrency: value,
                        },
                      },
                    );
                  }}
                ></Select>
              </div>
              <div>
                <span>オーダータイプ: </span>
                {data.ordersDetailHeader?.OrderType}
              </div>
              <div>Buyer: {data.ordersDetailHeader?.BuyerName}</div>
              <div>Seller: {data.ordersDetailHeader?.SellerName}</div>
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
        orderId={orderId}
        list={formData[OrdersTablesEnum.ordersDetailList] || []}
        editList={formData.editList}
        setEditList={setEditList}
        onUpdateOrderItem={onUpdateOrderItem}
        formData={formData}
      />
    </ListElement>
  );
};
