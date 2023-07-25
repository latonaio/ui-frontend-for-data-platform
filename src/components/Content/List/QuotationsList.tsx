import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  HeadTab,
  DetailList,
  DetailListTable,
} from './List.style';
import { QuotationsBuyerItem, QuotationsSellerItem } from '@/constants';
import { setDialog } from '@/store/slices/dialog';
import { QuotationsTablesEnum } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useDispatch } from 'react-redux';
import { formData } from '@/pages/quotations/list';
import { BlueButton } from '@/components/Button';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent';
import { texts } from '@/constants/message';

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
  onClickHandler: (type: QuotationsTablesEnum) => void;
  onCancelItem: onCancelItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: QuotationsTablesEnum;
  display: QuotationsTablesEnum;
  list: QuotationsSellerItem[] | QuotationsBuyerItem[];
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
  const listType = display === QuotationsTablesEnum.quotationsListBuyerItem ?
    QuotationsTablesEnum.quotationsListBuyerItem :
    QuotationsTablesEnum.quotationsListSellerItem;
  const dispatch = useDispatch();

  const renderList = (list: QuotationsBuyerItem[] | QuotationsSellerItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record`} onClick={() => {
            clickHandler(
              `/quotation/detail/list/${display === QuotationsTablesEnum.quotationsListBuyerItem ? 'buyer' : 'seller'}`,
              router,
            );
          }}>
            <td>{item.Quotation}</td>
            <td>{item.Buyer}</td>
            <td>{item.Seller}</td>
            <td>{item.HeaderOrderIsDefined}</td>
            <td>{item.QuoationType}</td>
			<td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
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
                            item.IsMarkedForDeletion ? 'の削除を取り消しますか？' : 'を削除しますか？',
                            () => {
                              onCancelItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  
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
              </div>
            </td>
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

export const QuotationsList = ({
                             formData,
                             onClickHandler,
                             className,
                             onCancelItem,
                           }: ListProps) => {
  const summaryData = {
    [QuotationsTablesEnum.quotationsListBuyerItem]: ['見積番号', 'Buyer', 'Seller', 'ヘッダーオーダー完了ステータス', '見積タイプ', ''],
    [QuotationsTablesEnum.quotationsListSellerItem]: ['見積番号', 'Buyer', 'Seller', 'ヘッダーオーダー完了ステータス', '見積タイプ', '']
  };

  const [display, setDisplay] = useState<QuotationsTablesEnum>(QuotationsTablesEnum.quotationsListBuyerItem);
  const [summary, setSummary] = useState<string[]>(summaryData[QuotationsTablesEnum.quotationsListBuyerItem]);
  const tabClickHandler = (type: QuotationsTablesEnum) => {
    setDisplay(type);
    onClickHandler(type);
  }

  useEffect(() => {
    setSummary(summaryData[
      display === QuotationsTablesEnum.quotationsListBuyerItem ?
        QuotationsTablesEnum.quotationsListBuyerItem : QuotationsTablesEnum.quotationsListSellerItem
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
            className={`${display === QuotationsTablesEnum.quotationsListBuyerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(QuotationsTablesEnum.quotationsListBuyerItem)}
          >User ＝ Buyer
          </li>
          <li
            className={`${display === QuotationsTablesEnum.quotationsListSellerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(QuotationsTablesEnum.quotationsListSellerItem)}
          >User ＝ Seller
          </li>
        </HeadTab>
      </div>
      <DetailListTableElement
        summary={summary}
        type={QuotationsTablesEnum.quotationsListBuyerItem}
        display={display}
        list={formData[QuotationsTablesEnum.quotationsListBuyerItem] || []}
        onCancelItem={onCancelItem}
      />
      <DetailListTableElement
        summary={summary}
        type={QuotationsTablesEnum.quotationsListSellerItem}
        display={display}
        list={formData[QuotationsTablesEnum.quotationsListSellerItem] || []}
        onCancelItem={onCancelItem}
      />
    </ListElement>
  );
};
