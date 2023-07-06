
import { toUpperCase } from '@/helpers/common';
import React, { useState } from 'react';
import {
  SupplyChainRelationshipTablesEnum,
  texts,
} from '@/constants';
import { ProductImageLabel } from '@/components/Label';
import { rem } from 'polished';
import { DisplayData } from '@/pages/supply-chain-relationship/detail/[userType]/[content]/[supplyChainRelationshipId]';
import {
  ExConfsHeader,
  ExConfsHeaderImage,
  ExConfsHeaderInfo,
  ExConfsHeaderInfoBottom,
  ExConfsHeaderInfoTop,
  ExConfsHeaderWrapper
} from '@/components/Content/Detail/SupplyChainRelationshipDetailExconfList.style';
import {
  DetailList,
  DetailListTable,
} from '@/components/Content/List/List.style';
import { useDispatch } from 'react-redux';
import { summaryHead } from '@/components/Content/List/List';
import { BlueButton } from '@/components/Button';

const DeliveryListElement = (
  indexNumber: number,
  item: any,
) => {
  return (
    <tr key={indexNumber} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`}>
      <td>{item.SupplyChainRelationshipDeliveryID}</td>
      <td>{item.DeliverToPartyName}</td>
      <td>{item.DeliverFromPartyName}</td>
      <td>
        <div>
          <BlueButton
            isFinished={item.IsMarkedForDeletion}
            className={'size-relative'}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {texts.button.delete}
          </BlueButton>
        </div>
      </td>
    </tr>
  )
}

const DeliveryPlantListElement = (
	indexNumber: number,
	item: any,
  ) => {
	return (
	  <tr key={indexNumber} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`}>
		<td>{item.SupplyChainRelationshipDeliveryID}</td>
		<td>{item.SupplyChainRelationshipDeliveryPlantID}</td>
		<td>{item.DeliverToPartyName}</td>
		<td>{item.DeliverFromPartyName}</td>
		<td>{item.DeliverToPlantName}</td>
		<td>{item.DeliverFromPlantName}</td>
		<td>
		  <div>
			<BlueButton
			  isFinished={item.IsMarkedForDeletion}
			  className={'size-relative'}
			  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
				e.stopPropagation();
				e.preventDefault();
			  }}
			>
			  {texts.button.delete}
			</BlueButton>
		  </div>
		</td>
	  </tr>
	)
  }

  const BillingListElement = (
	indexNumber: number,
	item: any,
  ) => {
	return (
	  <tr key={indexNumber} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`}>
		<td>{item.SupplyChainRelationshipBillingID}</td>
		<td>{item.BlllToParty}</td>
		<td>{item.BillFromParty}</td>
		<td>
		  <div>
			<BlueButton
			  isFinished={item.IsMarkedForDeletion}
			  className={'size-relative'}
			  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
				e.stopPropagation();
				e.preventDefault();
			  }}
			>
			  {texts.button.delete}
			</BlueButton>
		  </div>
		</td>
	  </tr>
	)
  }

  const PaymentListElement = (
	indexNumber: number,
	item: any,
  ) => {
	return (
	  <tr key={indexNumber} className={`record ${item.IsMarkedForDeletion ? 'disabled' : ''}`}>
		<td>{item.SupplyChainRelationshipPaymentID}</td>
		<td>{item.Payer}</td>
		<td>{item.Payee}</td>
		<td>
		  <div>
			<BlueButton
			  isFinished={item.IsMarkedForDeletion}
			  className={'size-relative'}
			  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
				e.stopPropagation();
				e.preventDefault();
			  }}
			>
			  {texts.button.delete}
			</BlueButton>
		  </div>
		</td>
	  </tr>
	)
  }


const ListTableElement = ({
                                  summary,
                                  display,
                                  list,
                                  onUpdateItem,
                                }: any) => {
  const dispatch = useDispatch();
  const colSpan = 4;

  const renderList = (list: any[], display: DisplayData) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        if (display?.content === 'delivery') { return (DeliveryListElement(index, item)) }
        if (display?.content === 'deliveryPlant') { return (DeliveryPlantListElement(index, item)) }
        if (display?.content === 'billing') { return (BillingListElement(index, item)) }
        if (display?.content === 'payment') { return (PaymentListElement(index, item)) }
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={colSpan}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  }

  return (
    <DetailList
      // className={`${type === display ? '' : 'hidden'}`}
      className={``}
    >
      <DetailListTable className={''}>
        <tbody>
        {summaryHead(summary)}
        {renderList(list, display)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
}

export const SupplyChainRelationshipDetailContent= ({
                                       data,
                                       className,
}: {
  data: DisplayData;
  className?: string;
}) => {
  const contentDisplayData = {
    images: data &&
      data[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailHeader]?.Images,
    params: data &&
      data[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetail]
        ?.Contents.find(
          (item) => item.Content === toUpperCase(data.content))
        ?.Param,
  }

  const supplyChainRelationshipDetailHeader = data && data[SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailHeader];

  const summary = [
    {
      content: 'delivery',
      data: [
        'サプライチェーンリレーションシップ入出荷コード',
        '入出荷先',
        '入出荷元',
        '',
      ],
    },
    {
      content: 'deliveryPlant',
      data: [
        'サプライチェーンリレーションシップ入出荷コード',
        'サプライチェーンリレーションシップ入出荷プラントコード',
        '入出荷先',
        '入出荷元',
        '入出荷先プラント',
        '入出荷元プラント',
        '',
      ],
    },
    {
      content: 'billing',
      data: [
        'サプライチェーンリレーションシップ請求コード',
        '請求元',
        '請求先',
        '',
      ],
    },
    {
      content: 'payment',
      data: [
        'サプライチェーンリレーションシップ支払コード',
        '支払人',
        '受取人',
        '',
      ],
    },
  ];

  const summaryList = summary.find((item) => item.content === data?.content)?.data;

  return (
    <>
      <ExConfsHeader>
        <ExConfsHeaderWrapper
          className={'flex justify-start items-center'}
          style={{
            marginBottom: rem(20),
            marginLeft: rem(40),
          }}
        >
          <div
            className={'flex justify-start items-center'}
          >
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>SCR: {supplyChainRelationshipDetailHeader?.SupplyChainRelationshipID}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>Buyer: {supplyChainRelationshipDetailHeader?.BuyerName}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>Seller: {supplyChainRelationshipDetailHeader?.SellerName}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
          </div>
        </ExConfsHeaderWrapper>
      </ExConfsHeader>

      {
        data?.content === 'delivery' && (
          <ListTableElement
            summary={summaryList}
            display={data}
            list={contentDisplayData.params || []}
            // onUpdateItem={onUpdateItem}
          />
        )
      }
      {
        data?.content === 'deliveryPlant' && (
          <ListTableElement
            summary={summaryList}
            display={data}
            list={contentDisplayData.params || []}
            // onUpdateItem={onUpdateItem}
          />
        )
      }
      {
        data?.content === 'billing' && (
          <ListTableElement
            summary={summaryList}
            display={data}
            list={contentDisplayData.params || []}
            // onUpdateItem={onUpdateItem}
          />
        )
      }
      {
        data?.content === 'payment' && (
          <ListTableElement
            summary={summaryList}
            display={data}
            list={contentDisplayData.params || []}
            // onUpdateItem={onUpdateItem}
          />
        )
      }
    </>
  );
};
