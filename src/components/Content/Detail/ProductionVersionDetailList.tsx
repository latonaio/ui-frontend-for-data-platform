import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  ListHeaderInfo,
  ListHeaderInfoTop,
  ListHeaderInfoBottom,
  NoImage,
} from '../List/List.style';
import { BackButton, BlueButton } from '@/components/Button';
import {
  ProductionVersionTablesEnum,
  ProductionVersionDetailListItem,
  ProductionVersionDetailListHeader,
  UserTypeEnum,
} from '@/constants';
import { clickHandler, summaryHead } from '../List/List';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { formData, onUpdateItem } from '@/pages/production-version/detail/list/[userType]/[productionVersion]';
import { texts } from '@/constants/message';
import { generateImageProductUrl, toLowerCase } from '@/helpers/common';
import { rem } from 'polished';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';


export interface ProductionVersionDetailListProps {
  className?: string;
  userType: string;
  productionVersion: number;
  data: {
	businessPartner?: number;
    productionVersionDetailListItem?: ProductionVersionDetailListItem[];
    productionVersionDetailListHeader?: ProductionVersionDetailListHeader;
  };
  formData: formData;
  onUpdateItem: any;
}

interface DetailListTableElementProps {
  userType: string;
  productionVersion: number;
  summary: string[];
  businessPartner?: number;
  list: ProductionVersionDetailListItem[];
  formData: formData;
  onUpdateItem: onUpdateItem;
}

const DetailListTableElement = ({
                                  userType,
                                  productionVersion,
                                  summary,
								  businessPartner,
                                  list,
                                  formData,
								  onUpdateItem,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = ProductionVersionTablesEnum.productionVersionDetailListOwnerBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: ProductionVersionDetailListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              `/production-order/detail/${item}/${userType}`,
              router
            );
          }}>

            <td>{item.ProductionVersion}</td>
            <td>{item.Product}</td>
            <td>{item.ProductDescription}</td>
            <td>{item.PlantName}</td>
            <td>{item.BillOfMaterial}</td>
            <td>{item.Operations}</td>
            <td>{item.ValidityStartDate}</td>
            <td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
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
                                  BillOfMaterialMaster: {
                                    Operations: item.Operations,
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

export const ProductionVersionDetailList = ({
                                            userType,
                                            productionVersion,
                                            data,
                                            className,
                                            formData,
											onUpdateItem,
                                          }: ProductionVersionDetailListProps) => {
  const summary = [
    '製造バージョン明細番号',
    '品目',
    '品目テキスト',
    'プラント',
    '部品表',
    '作業手順',
    '有効開始日付',
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
              <div>製造バージョン: {data.productionVersionDetailListHeader?.ProductionVersion}</div>
              <div>有効開始日付: {data.productionVersionDetailListHeader?.ValidityStartDate}</div>
            </ListHeaderInfoTop>
            <ListHeaderInfoBottom className={'flex justify-start text-xl'}>
              <div>オーナープラント: {data.productionVersionDetailListHeader?.OwnerPlantName}</div>
              <div>品目テキスト: {data.productionVersionDetailListHeader?.ProductDescription}</div>
            </ListHeaderInfoBottom>
          </div>
		  <div>
              {data.productionVersionDetailListHeader?.Images?.ProductionVersion && (
                <img
                  className={'m-auto'}
                  style={{
                    width: rem(60),
                  }}
                  src={data.productionVersionDetailListHeader?.Images && generateImageProductUrl(
                    data.productionVersionDetailListHeader?.Images?.ProductionVersion?.BusinessPartnerID ?
                    data.productionVersionDetailListHeader?.Images?.ProductionVersion?.BusinessPartnerID.toString() : null, data.productionVersionDetailListHeader?.Images?.ProductionVersion || {}
                  )}
                  alt={`${data.productionVersionDetailListHeader?.ProductDescription}`}
                />
              )}
              {!data.productionVersionDetailListHeader?.Images?.ProductionVersion && (
                <NoImage>
                  <div>No</div>
                  <div>Image</div>
                </NoImage>
              )}
              </div>
          <div className={'columnRight'}>
            <BackButton className={'whiteInfo text-sm'}>その他の情報</BackButton>
          </div>
        </ListHeaderInfo>
      </div>
      <DetailListTableElement
        userType={userType}
        summary={summary}
        productionVersion={productionVersion}
		businessPartner={data.businessPartner}
        list={formData[ProductionVersionTablesEnum.productionVersionDetailList] || []}
        formData={formData}
        onUpdateItem={onUpdateItem}
      />
    </ListElement>
  );
};



