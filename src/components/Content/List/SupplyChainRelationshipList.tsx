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
import { BlueButton } from '@/components/Button';
import { SupplyChainRelationshipBuyerItem, SupplyChainRelationshipSellerItem } from '@/constants';
import { SupplyChainRelationshipTablesEnum } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { PublicImage } from '@/components/Image';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData } from '@/pages/supply-chain-relationship/list';
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
  onClickHandler: (type: SupplyChainRelationshipTablesEnum) => void;
  onCancelItem: onCancelItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: SupplyChainRelationshipTablesEnum;
  display: SupplyChainRelationshipTablesEnum;
  list: SupplyChainRelationshipBuyerItem[] | SupplyChainRelationshipSellerItem[];
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
  const listType = display === SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem ?
    SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem :
    SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem;
  const dispatch = useDispatch();

  const renderList = (list: SupplyChainRelationshipBuyerItem[] | SupplyChainRelationshipSellerItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record`} onClick={() => {
            // clickHandler(
            //   `/supply-chain-relationship/detail/list/${display === SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem ? 'buyer' : 'seller'}/${item.OrderID}`,
            //   router,
            // );
          }}>
            <td>{item.SupplyChainRelationshipID}</td>
            <td>{item.BuyerName}</td>
            <td>{item.SellerName}</td>
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
                            item.IsMarkedForDeletion ? 'オーダーの削除を取り消しますか？' : 'オーダーを削除しますか？',
                            () => {
                              onCancelItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  Orders: {
                                    OrderID: item.SupplyChainRelationshipID,
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

export const SupplyChainRelationshipList = ({
                             formData,
                             onClickHandler,
                             className,
                             onCancelItem,
                           }: ListProps) => {
  const summaryData = {
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: ['サプライチェーンリレーションシップコード', 'Buyer', 'Seller', ''],
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: ['サプライチェーンリレーションシップコード', 'Buyer', 'Seller', '',],
  };

  const [display, setDisplay] = useState<SupplyChainRelationshipTablesEnum>(SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem);
  const [summary, setSummary] = useState<string[]>(summaryData[SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]);
  const tabClickHandler = (type: SupplyChainRelationshipTablesEnum) => {
    setDisplay(type);
    onClickHandler(type);
  }

  useEffect(() => {
    setSummary(summaryData[
      display === SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem ?
        SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem : SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem
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
            className={`${display === SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem)}
          >User ＝ Buyer
          </li>
          <li
            className={`${display === SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem)}
          >User ＝ Seller
          </li>
        </HeadTab>
      </div>
      <DetailListTableElement
        summary={summary}
        type={SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem}
        display={display}
        list={formData[SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem] || []}
        onCancelItem={onCancelItem}
      />
      <DetailListTableElement
        summary={summary}
        type={SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem}
        display={display}
        list={formData[SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem] || []}
        onCancelItem={onCancelItem}
      />
    </ListElement>
  );
};
