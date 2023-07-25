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
  ProductionOrderDetailHeader,
  ProductionOrderDetailListItem,
  ProductionOrderTablesEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton, Checkbox, GreenButton, BlueButton } from '@/components/Button';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  formData, onUpdateItem,
} from '@/pages/production-order/detail/list/[userType]/[productionOrder]';
import { texts } from '@/constants/message';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';

export interface ProductionOrderDetailListProps {
  className?: string;
  userType: string;
  productionOrder: number;
  data: {
    businessPartner?: number;
    productionOrderDetailListItem?: ProductionOrderDetailListItem[];
    productionOrderDetailHeader?: ProductionOrderDetailHeader;
  };
  formData: formData;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  userType: string;
  productionOrder: number;
  summary: string[];
  businessPartner?: number;
  list: ProductionOrderDetailListItem[];
  formData: formData;
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  userType,
                                  productionOrder,
                                  summary,
                                  businessPartner,
                                  list,
                                  formData,
								  onUpdateItem,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = ProductionOrderTablesEnum.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: ProductionOrderDetailListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled ? 'disabled' : ''}`} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              `/production-order/detail/${productionOrder}/${item.ProductionOrderItem}/${userType}/${item.Product}`,
              router
            );
          }}>
            <td>{item.ProductionOrderItem}</td>
            <td>{item.Product}/{item.ProductName}</td>
            <td>{item.MRPArea}</td>
            <td>{item.TotalQuantity}</td>
            <td>{item.ConfirmedYieldQuantity}</td>
            <td>
              <Checkbox
                isChecked={item.ItemIsConfirmed}
              />
            </td>
            <td>
              <Checkbox
                isChecked={item.ItemIsPartiallyConfirmed}
              />
            </td>
            <td>
              <Checkbox
                isChecked={item.ItemIsReleased}
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
                  isFinished={item.ItemIsReleased}
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
                            item.ItemIsReleased ? 'オーダーの削除を取り消しますか？' : 'オーダーを削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.ItemIsReleased,
                                index,
                                'ItemIsReleased',
                                {
                                  ProductionOrder: {
                                    ProductionOrder: item.ProductionOrder,
                                    IsMarkedForDeletion: !item.ItemIsReleased,
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
                {/*  className="icon-schedule"*/}
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
        <td colSpan={9}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  };

  return (
    <DetailList>
      <DetailListTable className={''}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const ProductionOrderDetailList = ({
                                            userType,
                                            productionOrder,
                                            data,
                                            className,
                                            formData,
											onUpdateItem,
                                          }: ProductionOrderDetailListProps) => {
  const summary = [
    '製造指図明細番号',
    '品目コード/品目名称',
    'MRPエリア',
    '数量',
    '確認済み生産数量',
    '在庫確認',
    '部分的確認済み明細',
    'リリース済み',
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
              <div>製造指図番号: {data.productionOrderDetailHeader?.ProductionOrder}</div>
              <div>製造指図計画開始日付 / 時刻: {data.productionOrderDetailHeader?.ProductionOrderPlannedStartDate} {data.productionOrderDetailHeader?.ProductionOrderPlannedStartTime}</div>
              <div>製造指図計画終了日付 / 時刻: {data.productionOrderDetailHeader?.ProductionOrderPlannedEndDate} {data.productionOrderDetailHeader?.ProductionOrderPlannedEndTime}</div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
              <div>OwnerProductionPlantBusinessPartner: {data.productionOrderDetailHeader?.OwnerProductionPlant}</div>
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
        productionOrder={productionOrder}
        businessPartner={data.businessPartner}
        list={formData[ProductionOrderTablesEnum.productionOrderDetailList] || []}
        formData={formData}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};
