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
} from './SupplyChainRelationshipDetailExconfList.style';
import { DisplayData } from '@/pages/supply-chain-relationship/detail/exconf/list/[userType]/[supplyChainRelationshipId]';
import { SupplyChainRelationshipTablesEnum } from '@/constants';
import { toLowerCase } from '@/helpers/common';
import { clickHandler } from '@/components/Content/List/List';
import { useRouter } from 'next/router';

export const SupplyChainRelationshipDetailExconfList = ({
                                                          data,
                                                          userType,
                                                        }: {
                                                          data: DisplayData;
                                                          userType: string;
                                                        },
) => {
  const contentList = [
    { type: 'General', color: 'blue' },
    { type: 'Delivery', color: 'green' },
    { type: 'DeliveryPlant', color: 'blue' },
    { type: 'Billing', color: 'green' },
    { type: 'Payment', color: 'blue' },
    { type: 'Transaction', color: 'green' },
  ]

  const supplyChainRelationshipDetailExconfListHeader = data && data[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader];
  const supplyChainRelationshipDetailExconfList = data && data[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]?.Existences;
  const router = useRouter();

  return (
    <ExConfs>
      <ExConfsHeader>
        <ExConfsHeaderWrapper
          className={'flex justify-start items-center'}
        >
          <div
            className={'flex justify-start items-center'}
          >
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>SCR: {supplyChainRelationshipDetailExconfListHeader?.SupplyChainRelationshipID}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>Buyer: {supplyChainRelationshipDetailExconfListHeader?.BuyerName}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>Seller: {supplyChainRelationshipDetailExconfListHeader?.SellerName}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
          </div>
        </ExConfsHeaderWrapper>
      </ExConfsHeader>
      <ExConfsContent>
        <ExConfsContentList>
          {supplyChainRelationshipDetailExconfList?.map((item, index) => {
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
                    `/supply-chain-relationship/detail` +
                    `/${userType}` +
                    `/${toLowerCase(item.Content)}` +
                    `/${data && data[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]?.SupplyChainRelationshipID}`,
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
