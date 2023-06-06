import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  HeadTab,
  DetailList,
  DetailListTable,
  IcnOutside,
  IcnInvoice,
  ListHeaderInfo,
  ListHeaderInfoTop,
  ListHeaderInfoBottom,
} from './List.style';
import {
  InvoiceDocumentTablesEnum,
  InvoiceDocumentListItem,
  BuyerItem,
  SellerItem,
  OrdersTablesEnum,
  ProductionOrderTablesEnum, ProductionOrderItem, UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { PublicImage } from '@/components/Image';
import { Checkbox, GreenButton } from '@/components/Button';
import { dialogState, setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { formData } from '@/pages/production-order/list';
import { toLowerCase } from '@/helpers/common';
import { texts } from '@/constants/message';
import { rem } from 'polished';

interface ListProps {
  className?: string;
  formData: formData;
  // onCancelItem: onCancelItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: ProductionOrderTablesEnum;
  display: ProductionOrderTablesEnum;
  list: ProductionOrderItem[];
  // onCancelItem: onCancelItem;
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
                                  // onCancelItem,
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
              <div className={'w-full inline-flex justify-evenly items-center'}>
                <GreenButton
                  className={'size-relative'}
                  isFinished={item.IsCancelled}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    e.preventDefault();

                    if (item.IsCancelled) { return; }

                    // dispatch(setDialog(cancelDialog(dispatch, () => {
                    //   onCancelItem(
                    //     true,
                    //     index,
                    //     'IsCancelled',
                    //     {
                    //       InvoiceDocument: {
                    //         InvoiceDocument: item.InvoiceDocument,
                    //         IsCancelled: true,
                    //       }
                    //     },
                    //     listType,
                    //     'cancel',
                    //   );
                    // })));
                  }}
                >
                  {texts.button.cancel}
                </GreenButton>
                {/*<i*/}
                {/*  className="icon-schedule"*/}
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
                                      // onCancelItem,
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
        // onCancelItem={onCancelItem}
      />
    </ListElement>
  );
};

