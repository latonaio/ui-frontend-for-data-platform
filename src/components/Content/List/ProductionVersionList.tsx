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
  NoImage,
} from './List.style';
import {
  InvoiceDocumentTablesEnum,
  InvoiceDocumentListItem,
  BuyerItem,
  SellerItem,
  OrdersTablesEnum,
  ProductionVersionTablesEnum, ProductionVersionListItem, UserTypeEnum, ProductionOrderTablesEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { PublicImage } from '@/components/Image';
import { BlueButton, Checkbox, GreenButton } from '@/components/Button';
import { dialogState, setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { formData } from '@/pages/production-version/list';
import { generateImageEquipmentUrl, toLowerCase } from '@/helpers/common';
import { texts } from '@/constants/message';
import { rem } from 'polished';

interface ListProps {
  className?: string;
  formData: formData;
  // onCancelItem: onCancelItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: ProductionVersionTablesEnum;
  display: ProductionVersionTablesEnum;
  list: ProductionVersionListItem[];
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
  const listType = ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: ProductionVersionListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record`} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              `detail/list/${toLowerCase(UserTypeEnum.OwnerBusinessPartner)}/${item.ProductionVersion}`,
              router
            );
          }}>
            <td>
              {item.Images?.ProductionVersion && (
                <img
                  className={'m-auto'}
                  style={{
                    width: rem(60),
                  }}
                  src={item.Images && generateImageEquipmentUrl(
                    item.Images?.ProductionVersion ?
                      item.Images?.ProductionVersion.BusinessPartnerID.toString() : null, item.Images?.ProductionVersion || {}
                  )}
                  alt={`${item.ProductDescription}`}
                />
              )}
              {!item.Images?.ProductionVersion && (
                <NoImage>
                  <div>No</div>
                  <div>Image</div>
                </NoImage>
              )}
            </td>
            <td>{item.Product}</td>
            <td>{item.ProductionVersion}</td>
            <td>{item.ProductDescription}</td>
            <td>{item.OwnerPlantName}</td>
            <td>{item.BillOfMaterial}</td>
            <td>{item.Operations}</td>
            <td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
              <BlueButton
                  className={'size-relative'}
                  isFinished={item.IsMarkedForDeletion}
                  // onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  //   e.stopPropagation();
                  //   e.preventDefault();
                  //
                  //   dispatch(setDialog({
                  //     type: 'consent',
                  //     consent: {
                  //       isOpen: true,
                  //       children: (
                  //         cancelDialogTemplate(
                  //           dispatch,
                  //           item.IsMarkedForDeletion ? 'ビジネスパートナーの削除を取り消しますか？' : 'ビジネスパートナーを削除しますか？',
                  //           () => {
                  //             onCancelItem(
                  //               !item.IsMarkedForDeletion,
                  //               index,
                  //               'IsMarkedForDeletion',
                  //               {
                  //                 BusinessPartner: {
                  //                   BusinessPartner: item.BusinessPartner,
                  //                   IsMarkedForDeletion: !item.IsMarkedForDeletion,
                  //                 }
                  //               },
                  //               listType,
                  //             );
                  //           },
                  //         )
                  //       ),
                  //     }
                  //   }));
                  // }}
                >
                  {texts.button.delete}
                </BlueButton>
                <i className="text-3xl icon-file"></i>
                <i className="text-3xl icon-cogs"></i>
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
      <DetailListTable className={'ProductionVersionList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}
export const ProductionVersionList = ({
                                      formData,
                                      className,
                                      // onCancelItem,
                                    }: ListProps) => {
  const [display, setDisplay] = useState<ProductionVersionTablesEnum>(
    ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem,
  );
  const summary = [
    '品目画像',
    '品目コード',
    '製造バージョン',
    '品目名',
    'プラント',
    '部品表',
    '作業手順',
    '',
  ];

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <DetailListTableElement
        summary={summary}
        type={ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem}
        display={display}
        list={formData[ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem] || []}
        // onCancelItem={onCancelItem}
      />
    </ListElement>
  );
};

