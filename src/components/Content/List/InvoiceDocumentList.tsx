import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  HeadTab,
  DetailList,
  DetailListTable,
} from './List.style';
import {
  InvoiceDocumentTablesEnum,
  InvoiceDocumentListItem,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { Checkbox, GreenButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/invoice-document/list';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent';
import { texts } from '@/constants/message';

interface ListProps {
  className?: string;
  formData: formData;
  onClickHandler: (type: InvoiceDocumentTablesEnum) => void;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: InvoiceDocumentTablesEnum;
  display: InvoiceDocumentTablesEnum;
  list: InvoiceDocumentListItem[];
  onCancelItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
                                  onCancelItem,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = display === InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem ?
    InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem :
    InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem;
  const dispatch = useDispatch();

  const renderList = (list: InvoiceDocumentListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/invoice-document/detail/list/${display === InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem ? 'billToParty' : 'billFromParty'}/${item.InvoiceDocument}`,
              router,
            );
          }}>
            <td>{item.InvoiceDocument}</td>
            <td>{item.BillToParty}</td>
            <td>{item.BillFromParty}</td>
            <td>{item.InvoiceDocumentDate}</td>
            <td>{item.PaymentDueDate}</td>
            <td>
              <Checkbox
                isChecked={item.HeaderBillingIsConfirmed}
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
                          item.HeaderBillingIsConfirmed  ?
                            '請求を未照合に変更しますか？' : '請求を照合済みに変更しますか？',
                          () => {
                            onCancelItem(
                              !item.HeaderBillingIsConfirmed,
                              index,
                              'HeaderBillingIsConfirmed',
                              {
                                InvoiceDocument: {
                                  InvoiceDocument: item.InvoiceDocument,
                                  HeaderBillingIsConfirmed: !item.HeaderBillingIsConfirmed,
                                }
                              },
                              listType,
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
                              onCancelItem(
                                !item.IsCancelled,
                                index,
                                'IsCancelled',
                                {
                                  InvoiceDocument: {
                                    InvoiceDocument: item.InvoiceDocument,
                                    IsCancelled: !item.IsCancelled,
                                  }
                                },
                                listType,
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
                {/*<i*/}
                {/*  className="icon-clipboard-list"*/}
                {/*  style={{*/}
                {/*    fontSize: rem(32),*/}
                {/*  }}*/}
                {/*/>*/}
                {/*<i*/}
                {/*  className="icon-truck"*/}
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
        <td colSpan={7}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  }

  return (
    <DetailList
      className={`${type === display ? '' : 'hidden'}`}
    >
      <DetailListTable className={'deliveryDocumentList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}
export const InvoiceDocumentList = ({
                                      formData,
                                      onClickHandler,
                                      className,
                                      onUpdateItem,
                                    }: ListProps) => {
  const [display, setDisplay] = useState<InvoiceDocumentTablesEnum>(InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem);
  const tabClickHandler = (type: InvoiceDocumentTablesEnum) => {
    setDisplay(type);
    onClickHandler(type);
  }
  const summary = [
    '請求伝票番号',
    '請求先名',
    '請求元名',
    '請求日',
    '支払期日',
    '請求照合',
    '',
  ];

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <div>
        <HeadTab className={'text-center text-1xl mb-2'}>
          <li
            className={`${display === InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem)}
          >User ＝ BillToParty
          </li>
          <li
            className={`${display === InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem)}
          >User ＝ BillFromParty
          </li>
        </HeadTab>
      </div>
      <DetailListTableElement
        summary={summary}
        type={InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem}
        display={display}
        list={formData[InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem] || []}
        onCancelItem={onUpdateItem}
      />
      <DetailListTableElement
        summary={summary}
        type={InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem}
        display={display}
        list={formData[InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem] || []}
        onCancelItem={onUpdateItem}
      />
    </ListElement>
  );
};

