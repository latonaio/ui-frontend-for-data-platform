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
import {
  InvoiceDocumentDetailHeader,
  InvoiceDocumentDetailListItem,
  InvoiceDocumentTablesEnum,
} from '@/constants';
import { summaryHead } from './List';
import { BackButton, Checkbox, GreenButton } from '@/components/Button';
import { userTypeHandling } from '@/helpers/common';
import React from 'react';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/invoice-document/detail/list/[userType]/[invoiceDocument]';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent';
import { texts } from '@/constants/message';
import { rem } from 'polished';

export interface InvoiceDocumentDetailListProps {
  className?: string;
  userType: string;
  invoiceDocument: number;
  data: {
    businessPartner?: number;
    invoiceDocumentDetailListItem?: InvoiceDocumentDetailListItem[];
    invoiceDocumentDetailHeader?: InvoiceDocumentDetailHeader;
  };
  formData: formData;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  userType: string;
  invoiceDocument: number;
  summary: string[];
  businessPartner?: number;
  list: InvoiceDocumentDetailListItem[];
  formData: formData;
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  userType,
                                  invoiceDocument,
                                  summary,
                                  businessPartner,
                                  list,
                                  onUpdateItem,
                                  formData,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const renderList = (list: InvoiceDocumentDetailListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled ? 'disabled' : ''}`} onClick={(e) => {
            // e.preventDefault();
            // e.stopPropagation();
            // clickHandler(
            //   `/invoice-document/detail/${invoiceDocument}/${item.InvoiceDocumentItem}/${userType}/${item.Product}`,
            //   router
            // );
          }}>
            <td>{item.InvoiceDocumentItem}</td>
            <td>{item.Product}</td>
            <td>{item.InvoiceDocumentItemText}</td>
            <td>{item.InvoiceQuantityInBaseUnit}</td>
            <td>{item.InvoiceQuantityUnit}</td>
            <td>{!(item.ActualGoodsIssueDate) ? '未出荷' : `${item.ActualGoodsIssueDate} ${item.ActualGoodsIssueTime}`}</td>
            <td>{!(item.ActualGoodsReceiptDate) ? '未入荷' : `${item.ActualGoodsReceiptDate} ${item.ActualGoodsReceiptTime}`}</td>
            <td>
              <Checkbox
                isChecked={item.ItemBillingIsConfirmed}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  dispatch(setDialog({
                    type: 'consent',
                    consent: {
                      isOpen: true,
                      children: (
                        cancelDialogTemplate(
                          dispatch,
                          item.ItemBillingIsConfirmed ?
                            '請求を未照合に変更しますか？' : '請求を照合済みに変更しますか？',
                          () => {
                            onUpdateItem(
                              !item.ItemBillingIsConfirmed,
                              index,
                              'ItemBillingIsConfirmed',
                              {
                                InvoiceDocument: {
                                  InvoiceDocument: item.InvoiceDocument,
                                  Item: [
                                    {
                                      InvoiceDocumentItem: item.InvoiceDocumentItem,
                                      ItemBillingIsConfirmed: !item.ItemBillingIsConfirmed,
                                    }
                                  ]
                                },
                                accepter: ['Item'],
                              },
                              'update',
                            );
                          },
                        )
                      ),
                    }
                  }));
                }}
              />
            </td>
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
                            item.IsCancelled ?
                              '請求のキャンセルを取り消しますか？' : '請求をキャンセルしますか？',
                            () => {
                              onUpdateItem(
                                !item.IsCancelled,
                                index,
                                'IsCancelled',
                                {
                                  InvoiceDocument: {
                                    InvoiceDocument: item.InvoiceDocument,
                                    Item: [
                                      {
                                        InvoiceDocumentItem: item.InvoiceDocumentItem,
                                        IsCancelled: !item.IsCancelled,
                                      }
                                    ]
                                  },
                                  accepter: ['Item'],
                                },
                                'cancel',
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
                <i
                  className="icon-clipboard-list"
                  style={{
                    fontSize: rem(32),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    router.push(`/orders/detail/${item.OrdersDetailJumpReq.OrderID}/` +
                      `${item.OrdersDetailJumpReq.OrderItem}/buyer/${item.OrdersDetailJumpReq.Product}`);
                  }}
                />
                <i
                  className="icon-truck"
                  style={{
                    fontSize: rem(32),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    router.push(`/delivery-document/detail/${item.DeliveryDocumentDetailJumpReq.DeliveryDocument}/` +
                      `${item.DeliveryDocumentDetailJumpReq.DeliveryDocumentItem}/${userTypeHandling(
                        businessPartner,
                        {
                          key: 'deliverToParty',
                          value: item.DeliveryDocumentDetailJumpReq.DeliverToParty,
                        }, {
                          key: 'deliverFromParty',
                          value: item.DeliveryDocumentDetailJumpReq.DeliverFromParty,
                        })
                      }/${item.DeliveryDocumentDetailJumpReq.Product}`);
                  }}
                />
              </div>
            </td>
          </tr>
        );
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={8}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  };

  return (
    <DetailList>
      <DetailListTable className={'invoiceDocumentDetailList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const InvoiceDocumentDetailList = ({
                                            userType,
                                            invoiceDocument,
                                            data,
                                            className,
                                            formData,
                                            onUpdateItem,
                                          }: InvoiceDocumentDetailListProps) => {
  const summary = [
    '請求明細番号',
    '品目コード',
    '明細テキスト',
    '数量',
    '数量単位',
    '出荷完了日 / 時刻',
    '入荷完了日 / 時刻',
    '請求照合',
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
              <div>請求番号: {data.invoiceDocumentDetailHeader?.InvoiceDocument}</div>
              <div>請求日 / 時刻: {data.invoiceDocumentDetailHeader?.InvoiceDocumentDate} {data.invoiceDocumentDetailHeader?.InvoiceDocumentTime}</div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
              <div>BillToParty: {data.invoiceDocumentDetailHeader?.BillToParty}</div>
              <div>BillFromParty: {data.invoiceDocumentDetailHeader?.BillFromParty}</div>
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
        invoiceDocument={invoiceDocument}
        businessPartner={data.businessPartner}
        list={formData[InvoiceDocumentTablesEnum.invoiceDocumentDetailList] || []}
        formData={formData}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};
