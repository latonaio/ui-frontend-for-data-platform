import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
} from './List.style';
import {
  ProductionOrderTablesEnum, ProductionOrderItem, UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { Checkbox, GreenButton, BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/production-order/list';
import { toLowerCase } from '@/helpers/common';
import { texts } from '@/constants/message';
import { Template as cancelDialogTemplate } from '@/components/Dialog';

interface ListProps {
  className?: string;
  formData: formData;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: ProductionOrderTablesEnum;
  display: ProductionOrderTablesEnum;
  list: ProductionOrderItem[];
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
                                  onUpdateItem,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: ProductionOrderItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/production-order/detail/list/${toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)}/${item.ProductionOrder}`,
              router,
            );
          }}>
            <td>{item.ProductionOrder}</td>
            <td>{item.MRPArea}</td>
            <td>{item.Product}/{item.ProductName}</td>
            <td>{item.OwnerProductionPlantBusinessPartner}</td>
            <td>{item.OwnerProductionPlant}</td>
            <td>{item.TotalQuantity}</td>
            <td>
              <Checkbox
                isChecked={item.HeaderIsConfirmed}
              />
            </td>
            <td>
              <Checkbox
                isChecked={item.HeaderIsPartiallyConfirmed}
              />
            </td>
            <td>
              <Checkbox
                isChecked={item.HeaderIsReleased}
              />
            </td>
            <td>
              <div>
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
                              onUpdateItem(
                                !item.IsCancelled,
                                index,
                                'IsCancelled',
                                {
                                  ProductionOrder: {
                                    ProductionOrder: item.ProductionOrder,
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
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  ProductionOrder: {
                                    ProductionOrder: item.ProductionOrder,
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
        <td colSpan={10}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  }

  return (
    <DetailList
      className={`${type === display ? '' : 'hidden'}`}
    >
      <DetailListTable className={'productionOrderList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}
export const ProductionOrderList = ({
                                      formData,
                                      className,
                                      onUpdateItem,
                                    }: ListProps) => {
  const [display, setDisplay] = useState<ProductionOrderTablesEnum>(
    ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem,
  );
  const summary = [
    '製造指図番号',
    'MRPエリア',
    '品目コード/品目名称',
    'オーナー製造プラントBP',
    'オーナー製造プラント',
    '数量',
    '在庫確認',
    '部分的確認',
    'リリース済み',
    '',
  ];

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <DetailListTableElement
        summary={summary}
        type={ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem}
        display={display}
        list={formData[ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem] || []}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};

