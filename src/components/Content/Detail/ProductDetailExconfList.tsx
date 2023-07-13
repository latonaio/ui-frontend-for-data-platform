import React from 'react';
import {
  ExConfs,
  ExConfsContent,
  ExConfsContentList,
  ExConfsContentListLi,
  ExConfsHeader,
  ExConfsHeaderWrapper,
  ExConfsHeaderInfo,
  ExConfsHeaderInfoTop,
  ExConfsHeaderInfoBottom,
  ExConfsHeaderImage,
} from './ProductDetailExconfList.style';
import { DisplayData } from '@/pages/product/detail/exconf/list/[userType]/[product]';
import { ProductTablesEnum, UserTypeEnum } from '@/constants';
import { generateImageProductUrl, toLowerCase } from '@/helpers/common';
import { clickHandler } from '@/components/Content/List/List';
import { useRouter } from 'next/router';

export const ProductDetailExconfList = ({ data }: { data: DisplayData; }
) => {
  const contentList = [
    { type: 'General', color: 'blue' },
    { type: 'Text', color: 'green' },
    { type: 'BP', color: 'blue' },
    { type: 'BPText', color: 'green' },
    { type: 'BPPlant', color: 'blue' },
    { type: 'StorageLocation', color: 'green' },
    { type: 'StorageBin', color: 'blue' },
    { type: 'MRPArea', color: 'green' },
    { type: 'WorkSchedule', color: 'blue' },
    { type: 'Quality', color: 'green' },
    { type: 'Tax', color: 'blue' },
    { type: 'Accounting', color: 'green' },
  ]

  const productDetailExconfListHeader = data && data[ProductTablesEnum.productDetailExconfListHeader];
  const productDetailExconfList = data && data[ProductTablesEnum.productDetailExconfList]?.Existences;
  const router = useRouter();

  return (
    <ExConfs>
      <ExConfsHeader>
        <ExConfsHeaderWrapper
          className={'flex justify-start items-center'}
        >
          <ExConfsHeaderImage>
            <img
              src={productDetailExconfListHeader?.Images &&
                generateImageProductUrl(
                  productDetailExconfListHeader.Images?.Product?.BusinessPartnerID ?
                    productDetailExconfListHeader.Images.Product.BusinessPartnerID.toString() : null,
                  productDetailExconfListHeader.Images?.Product
                )}
              alt={`${productDetailExconfListHeader?.ProductGroupName}`}
              width={100}
            />
          </ExConfsHeaderImage>
          <div
            className={'flex justify-start items-center'}
          >
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>品目コード: {productDetailExconfListHeader?.Product}</ExConfsHeaderInfoTop>
              <ExConfsHeaderInfoBottom>基本数量単位: {productDetailExconfListHeader?.BaseUnit}</ExConfsHeaderInfoBottom>
            </ExConfsHeaderInfo>
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>品目名: {productDetailExconfListHeader?.ProductName}</ExConfsHeaderInfoTop>
              <ExConfsHeaderInfoBottom>有効開始日付: {productDetailExconfListHeader?.ValidityStartDate}</ExConfsHeaderInfoBottom>
            </ExConfsHeaderInfo>
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>品目グループ: {productDetailExconfListHeader?.ProductGroupName}</ExConfsHeaderInfoTop>
              <ExConfsHeaderInfoBottom>　</ExConfsHeaderInfoBottom>
            </ExConfsHeaderInfo>
          </div>
        </ExConfsHeaderWrapper>
      </ExConfsHeader>
      <ExConfsContent>
        <ExConfsContentList>
          {productDetailExconfList?.map((item, index) => {
            const foundContent = contentList
              .find((content) => content.type === item.Content);

            if (!foundContent) {
              return;
            }

            return (
              <ExConfsContentListLi
                key={index}
                className={
                  `${foundContent.color} ` +
                  `${!item.Exist ? 'disable' : 'cursor-pointer'} `
                }
                onClick={() => {
                  clickHandler(
                    `/product/detail` +
                    `/${toLowerCase(UserTypeEnum.BusinessPartner)}` +
                    `/${item.Content}` +
                    `/${data && data[ProductTablesEnum.productDetailExconfList]?.Product}`,
                    router,
                  );
                }}
              >{item.Content} {item.Exist}</ExConfsContentListLi>
            );
          })}
        </ExConfsContentList>
      </ExConfsContent>
    </ExConfs>
  );
};
