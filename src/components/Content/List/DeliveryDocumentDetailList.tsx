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
  DeliveryDocumentDetailHeader,
  DeliveryDocumentDetailListItem,
  DeliveryDocumentTablesEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton, GreenButton, BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/delivery-document/detail/list/[userType]/[deliveryDocument]';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent';
import { texts } from '@/constants/message';
import { rem } from 'polished';

export interface DeliveryDocumentDetailListProps {
  className?: string;
  userType: string;
  deliveryDocument: number;
  data: {
    deliveryDocumentDetailListItem?: DeliveryDocumentDetailListItem[];
    deliveryDocumentDetailHeader?: DeliveryDocumentDetailHeader;
  };
  formData: formData;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  userType: string;
  deliveryDocument: number;
  summary: string[];
  list: DeliveryDocumentDetailListItem[];
  formData: formData;
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  userType,
                                  deliveryDocument,
                                  summary,
                                  list,
                                  onUpdateItem,
                                  formData,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const renderList = (list: DeliveryDocumentDetailListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled || item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              `/delivery-document/detail/${deliveryDocument}/${item.DeliveryDocumentItem}/${userType}/${item.Product}`,
              router
            );
          }}>
            <td>{item.DeliveryDocumentItem}</td>
            <td>{item.Product}</td>
            <td>{item.DeliveryDocumentItemText}</td>
            <td>{item.OriginalQuantityInDeliveryUnit}</td>
            <td>{item.DeliveryUnit}</td>
            <td>{!(item.ActualGoodsIssueDate) ? '未出荷' : `${item.ActualGoodsIssueDate} ${item.ActualGoodsIssueTime}`}</td>
            <td>{!(item.ActualGoodsReceiptDate) ? '未入荷' : `${item.ActualGoodsReceiptDate} ${item.ActualGoodsReceiptTime}`}</td>
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
                              '入出荷のキャンセルを取り消しますか？' : '入出荷をキャンセルしますか？',
                            () => {
                              onUpdateItem(
                                !item.IsCancelled,
                                index,
                                'IsCancelled',
                                {
                                  DeliveryDocument: {
                                    DeliveryDocument: item.DeliveryDocument,
                                    Item: [
                                      {
                                        DeliveryDocumentItem: item.DeliveryDocumentItem,
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
                            item.IsMarkedForDeletion ?
                              '入出荷の削除を取り消しますか？' : '入出荷を削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  DeliveryDocument: {
                                    DeliveryDocument: item.DeliveryDocument,
                                    Item: [
                                      {
                                        DeliveryDocumentItem: item.DeliveryDocumentItem,
                                        IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                      }
                                    ]
                                  },
                                  accepter: ['Item'],
                                },
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
                <i
                  className="icon-clipboard-list"
                  style={{
                    fontSize: rem(32),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    router.push(`/orders/detail/${item.OrdersDetailJumpReq.OrderID}/` +
                      `${item.OrdersDetailJumpReq.OrderItem}/${userType === 'deliverToParty' ? 'buyer' : 'seller'}/${item.OrdersDetailJumpReq.Product}`);
                  }}
                />
                {/*<i*/}
                {/*  className="icon-invoice"*/}
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
        <td colSpan={8}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  };

  return (
    <DetailList>
      <DetailListTable className={'deliveryDocumentDetailList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const DeliveryDocumentDetailList = ({
                                             userType,
                                             deliveryDocument,
                                             data,
                                             formData,
                                             className,
                                             onUpdateItem,
                                           }: DeliveryDocumentDetailListProps) => {
  const summary = [
    '入出荷明細番号',
    '品目コード',
    '明細テキスト',
    '数量',
    '数量単位',
    '出荷完了日 / 時刻',
    '入荷完了日 / 時刻',
    '',
  ];

  console.log(data)

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <div>
        <ListHeaderInfo className={'flex justify-end'}>
          <div className={'columnLeft'}>
            <ListHeaderInfoTop className={'flex justify-start text-xl'}>
              <div>入出荷番号: {data.deliveryDocumentDetailHeader?.DeliveryDocument}</div>
              <div>入荷予定日 / 時刻: {data.deliveryDocumentDetailHeader?.PlannedGoodsReceiptDate} {data.deliveryDocumentDetailHeader?.PlannedGoodsReceiptTime}</div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
              <div>DeliverToPlant: {data.deliveryDocumentDetailHeader?.DeliverToPlantName}</div>
              <div>DeliverFromPlant: {data.deliveryDocumentDetailHeader?.DeliverFromPlantName}</div>
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
        deliveryDocument={deliveryDocument}
        list={formData[DeliveryDocumentTablesEnum.deliveryDocumentDetailList] || []}
        formData={formData}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};
