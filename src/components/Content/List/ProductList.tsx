import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  NoImage,
} from './List.style';
import {
  ProductTablesEnum,
  ProductItem,
  UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { useRouter } from 'next/router';
import { BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/product/list';
import { generateImageProductUrl, toLowerCase } from '@/helpers/common';
import { rem } from 'polished';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { texts } from '@/constants/message';

interface ListProps {
  className?: string;
  formData: formData;
  onUpdateItem: onUpdateItem;
}

interface DetailListTableElementProps {
  summary: string[];
  type: ProductTablesEnum;
  display: ProductTablesEnum;
  list: ProductItem[];
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
  const listType = ProductTablesEnum.productListBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: ProductItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/product/detail/exconf/list/${toLowerCase(UserTypeEnum.BusinessPartner)}/${item.Product}`,
              router,
            );
          }}>
            <td>
              {item.Images?.Product && (
                <img
                  className={'m-auto'}
                  style={{
                    width: rem(60),
                  }}
                  src={item.Images && generateImageProductUrl(
                    item.Images?.Product?.BusinessPartnerID ?
                      item.Images?.Product?.BusinessPartnerID.toString() : null, item.Images?.Product || {}
                  )}
                  alt={`${item.ProductName}`}
                />
              )}
              {!item.Images?.Product && (
                <NoImage>
                  <div>No</div>
                  <div>Image</div>
                </NoImage>
              )}
            </td>
            <td>{item.Product}</td>
            <td>{item.ProductName}</td>
            <td>{item.ProductGroup}</td>
            <td>{item.BaseUnit}</td>
            <td>{item.ValidityStartDate}</td>
            <td>
              <div>
                <BlueButton
                  isFinished={item.IsMarkedForDeletion}
                  className={'size-relative'}
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
                              '品目を削除を取り消しますか？' : '品目を削除しますか？',
                            () => {
                              onUpdateItem(
                                !item.IsMarkedForDeletion,
                                index,
                                'IsMarkedForDeletion',
                                {
                                  ProductMaster: {
                                    Product: item.Product,
                                    IsMarkedForDeletion: !item.IsMarkedForDeletion,
                                  },
                                  accepter: ['General']
                                },
                                listType,
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
      <DetailListTable className={'productionOrderList'}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}
export const ProductList = ({
                                      formData,
                                      className,
                                      onUpdateItem,
                                    }: ListProps) => {
  const [display, setDisplay] = useState<ProductTablesEnum>(
    ProductTablesEnum.productListBusinessPartnerItem,
  );
  const summary = [
    '商品画像',
    '品目コード',
    '品目名',
    '品目グループ',
    '基本数量単位',
    '有効開始日付',
    '',
  ];

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <DetailListTableElement
        summary={summary}
        type={ProductTablesEnum.productListBusinessPartnerItem}
        display={display}
        list={formData[ProductTablesEnum.productListBusinessPartnerItem] || []}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};


