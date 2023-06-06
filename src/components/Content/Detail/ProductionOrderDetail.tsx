import { clsx } from 'clsx';
import {
  Column, ItemStructureTable,
  OrderInfo,
  ProductCode,
  ProductDetail,
  ProductDetailBottom,
  ProductDetailTop,
  QuantityInfo,
} from './Detail.style';
import { BorderSolidPanel } from './BorderSolidPanel/BorderSolidPanel';
import { generateBarcodeImageUrl, generateImageProductUrl } from '@/helpers/common';
import { GreenInfoPanel } from './GreenInfoPanel/GreenInfoPanel';
import { Icon } from '@/components/Image';
import React, { useState } from 'react';
import { Detail } from '@/components/Content/Detail/Detail';
import {
  AuthedUser,
  ProductImage,
  ProductionOrderDetailProps,
  ComponentItem,
  OperationItem,
} from '@/constants';
import { PopupTranslucent } from '@/components/Popup/Popup';
import { formData, ActiveMenuTab } from '@/pages/production-order/detail/[productionOrder]/[productionOrderItem]/[userType]/[product]';
import { Label } from '@/components/Label';
import { rem } from 'polished';

interface BasicInfoElement {
  productionOrder: number;
  productionOrderItem: number;
  productCode: string;
  productName: string;
  orderItemText: string;
  mrpArea: string;
  productionVersion: number;
  productImage: ProductImage;
  businessPartner: AuthedUser['businessPartner'];
  closedPopup: boolean;
  setClosedPopup: (closedPopup: boolean) => void;
}

interface ProductDetailTopElement {
  minimumLotSizeQuantity: number;
  maximumLotSizeQuantity: number;
  standardLotSizeQuantity: number;
  lotSizeRoundingQuantity: number;
  productionOrderPlannedStartDate: string;
  productionOrderPlannedStartTime: string;
  productionOrderPlannedEndDate: string;
  productionOrderPlannedEndTime: string;
  productionOrderActualStartDate: string;
  productionOrderActualStartTime: string;
  productionOrderActualEndDate: string;
  productionOrderActualEndTime: string;
  totalQuantity: number;
  plannedScrapQuantity: number;
  confirmedYieldQuantity: number;
  productionUnit: string;
}

interface ProductDetailBottomElement {
  className: string;
  productionPlant: string;
  productionPlantStorageLocation: string;
  components: ComponentItem[];
  operations: OperationItem[];
  activeMenuTab: string;
}

const BasicInfoElement = (data: Partial<BasicInfoElement>) => {
  return (
    <>
      <OrderInfo>
        <GreenInfoPanel
          className={'text-lg font-bold mb-3 relative'}
        >
          <div>製造指図番号: {data.productionOrder}</div>
          <div>明細番号: {data.productionOrderItem}</div>
          <div className={'text-sm'}>{data.orderItemText}</div>
          <div
            className={'imgBox'}
            onClick={() => {
              data.setClosedPopup && data.setClosedPopup(!data.closedPopup);
          }}>
            <Icon
              className={'icon'}
              imageName={'schedule'}
              stopPropagation={true}
              width={55}
              style={{ color: '#5e5e5e' }}
            />
          </div>
        </GreenInfoPanel>
        <ProductCode className={'text-base font-bold'}>
          <div>品目コード： {data.productCode}</div>
          <div>品名：{data.productName}</div>
          <div>MRPエリア：{data.mrpArea}</div>
          <div>製造バージョン：{data.productionVersion}</div>
        </ProductCode>
      </OrderInfo>
      <div>
        <img
          src={data.productImage &&
            generateImageProductUrl(
              data.productImage.BusinessPartnerID ?
                data.productImage.BusinessPartnerID.toString() :
                null,
              data.productImage
            )}
          alt={`${data.productName}`}
        />
      </div>
    </>
  )
}

const ProductDetailTopElement = ({
                                   minimumLotSizeQuantity,
                                   maximumLotSizeQuantity,
                                   standardLotSizeQuantity,
                                   lotSizeRoundingQuantity,
                                   productionOrderPlannedStartDate,
                                   productionOrderPlannedStartTime,
                                   productionOrderPlannedEndDate,
                                   productionOrderPlannedEndTime,
                                   productionOrderActualStartDate,
                                   productionOrderActualStartTime,
                                   productionOrderActualEndDate,
                                   productionOrderActualEndTime,
                                   totalQuantity,
                                   plannedScrapQuantity,
                                   confirmedYieldQuantity,
                                   productionUnit,
                                 }: Partial<ProductDetailTopElement>) => {
  return (
    <>
      <ProductDetailTop className={'mb-4 flex justify-start items-top'}>
        <div>
          <QuantityInfo className={'smallFont'}>
            <div className={'flex flex-row justify-between items-center panel'}>
              <div>最小ロットサイズ:</div>
              <div>{minimumLotSizeQuantity} {productionUnit}</div>
            </div>
            <div className={'flex flex-row justify-between items-center panel'}>
              <div>最大ロットサイズ:</div>
              <div>{maximumLotSizeQuantity} {productionUnit}</div>
            </div>
            <div className={'flex flex-row justify-between items-center panel'}>
              <div>標準ロットサイズ:</div>
              <div>{standardLotSizeQuantity} {productionUnit}</div>
            </div>
            <div className={'flex flex-row justify-between items-center panel'}>
              <div>丸め数量:</div>
              <div>{lotSizeRoundingQuantity} {productionUnit}</div>
            </div>
          </QuantityInfo>
        </div>
        <div className={'w-3/4 ml-2'}>
          <div className={'flex justify-start'}>
            <BorderSolidPanel
              className={'w-4/5 smallFont'}
            >
              <ul>
                <li>計画開始日付/時刻: {productionOrderPlannedStartDate} {productionOrderPlannedStartTime}</li>
                <li>計画終了日付/時刻: {productionOrderPlannedEndDate} {productionOrderPlannedEndTime}</li>
                <li>実際開始日付/時刻: {productionOrderActualStartDate} {productionOrderActualStartTime}</li>
                <li>実際終了日付/時刻: {productionOrderActualEndDate} {productionOrderActualEndTime}</li>
              </ul>
            </BorderSolidPanel>
            <div style={{
              marginLeft: rem(8),
            }}>
              <Label className={'yellow mb-1'}>合計数量: {totalQuantity}</Label>
              <Label className={'blue mb-1'}>計画不良数量: {plannedScrapQuantity}</Label>
              <Label className={'red mb-1'}>確認済数量: {confirmedYieldQuantity}</Label>
            </div>
          </div>
        </div>
      </ProductDetailTop>
    </>
  )
}

const ComponentItemStructureHeader = (
  productionPlant: ProductDetailBottomElement['productionPlant'] = '',
  productionPlantStorageLocation: ProductDetailBottomElement['productionPlantStorageLocation'] = '',
) => {
  return (
    <div className={'flex justify-start mb-4'}>
      <Label
        className={'yellow'}
        style={{
          marginBottom: rem(4),
          fontSize: rem(16),
          lineHeight: rem(16),
          padding: `${rem(4)} ${rem(8)}`,
          borderRadius: rem(4),
        }}
        enable={{ border: true }}
      >製造プラント: {productionPlant}</Label>
      <div
        style={{
          fontSize: rem(12),
        }}
      >
        <div
          style={{
            marginTop: rem(4),
            marginLeft: rem(13),
          }}
        >
          <span>保管場所: </span>
          <span className={'color-red text-base'}>{productionPlantStorageLocation}</span>
        </div>
      </div>
    </div>
  )
}

const ItemStructureHeader = (activeMenuTabType: string = '') => {
  const configurationItem = [
    { title: '', style: {} },
    { title: '構成品目要求日時', style: { color: '#3b61b1' } },
    { title: '要求数量', style: { color: '#bb9334' } },
    { title: '引当済数量', style: { color: '#bb9334' } },
    { title: '原価', style: { color: '#bb9334' },},
  ];

  const productionOrderItem = [
    { title: '', style: {} },
    { title: '計画開始', style: { color: '#3b61b1' } },
    { title: '計画終了', style: { color: '#bb9334' } },
    { title: '実績開始', style: { color: '#bb9334' } },
    { title: '実績終了', style: { color: '#bb9334' } },
    { title: '確認済', style: { color: '#D52E2EFF' } },
  ];

  const itemStructureHeader = activeMenuTabType === ActiveMenuTab.configurationItem ?
    [...configurationItem] :
    [...productionOrderItem];

  return (
    <tr className={'head'}>
      {itemStructureHeader.map((item, index) => {
        return (<td key={index} style={item.style}>{item.title}</td>);
      })}
    </tr>
  );
}

const ProductDetailBottomElement = ({
                                      className,
                                      productionPlant,
                                      productionPlantStorageLocation,
                                      components = [],
                                      operations = [],
                                      activeMenuTab,
                                    }: Partial<ProductDetailBottomElement>) => {
  return (
    <div className={`${className}`}>
      <ProductDetailBottom>
        {ComponentItemStructureHeader(productionPlant, productionPlantStorageLocation)}
        <BorderSolidPanel
          className={'productionOrder'}
          title={'構成品目情報'}
          isSideBySide={false}
          isScrollButton={true}
        >
          <div>
            <ItemStructureTable className={`${activeMenuTab}`}>
              <tbody>
              {ItemStructureHeader(activeMenuTab)}
              {activeMenuTab === ActiveMenuTab.configurationItem && components.map((item, index) => {
                return (
                  <tr key={index} className={'record'}>
                    <td className={'text-lg'}>明細{index + 1}: {item.ComponentProduct}</td>
                    <td>
                      <div>{item.ComponentProductRequirementDate}</div>
                      <div>{item.ComponentProductRequirementTime}</div>
                    </td>
                    <td>{item.RequiredQuantity} {item.BaseUnit}</td>
                    <td>{item.WithdrawnQuantity} {item.BaseUnit}</td>
                    {/* CostingPolicyがSの場合:StandardPrice */}
                    {/* CostingPolicyがVの場合:MovingAveragePrice */}
                    {item.CostingPolicy === 'S' && <td>{item.StandardPrice}</td>}
                    {item.CostingPolicy === 'V' && <td>{item.MovingAveragePrice}</td>}
                  </tr>
                )
              })}
              {activeMenuTab === ActiveMenuTab.productionOrder && operations.map((item, index) => {
                return (
                  <tr key={index} className={'record'}>
                    <td>
                      <div className={'text-lg'}>明細{index + 1}: {item.OperationText}</div>
                      <div>ワークセンタ: {item.WorkCenter}</div>
                      <div>作業計画合計数量: {item.OperationPlannedTotalQuantity}</div>
                      <div>作業合計歩留数量: {item.OperationTotalConfirmedYieldQuantity}</div>
                    </td>
                    <td>
                      <div>{item.OperationErlstSchedldExecStrtDte}</div>
                      <div>{item.OperationErlstSchedldExecStrtTme}</div>
                    </td>
                    <td>
                      <div>{item.OperationErlstSchedldExecEndDate}</div>
                      <div>{item.OperationErlstSchedldExecEndTime}</div>
                    </td>
                    <td>
                      <div>{item.OperationActualExecutionStartDate}</div>
                      <div>{item.OperationActualExecutionStartTime}</div>
                    </td>
                    <td>
                      <div>{item.OperationActualExecutionEndDate}</div>
                      <div>{item.OperationActualExecutionEndTime}</div>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </ItemStructureTable>
          </div>
        </BorderSolidPanel>
      </ProductDetailBottom>
    </div>
  )
}

export const ProductionOrderDetail = ({
                                        data,
                                        className,
                                        paginationData,
                                        formData,
                                        activeMenuTab,
                                      }: {
  className?: string;
  data: Partial<ProductionOrderDetailProps>;
  formData: formData;
  paginationData: any;
  activeMenuTab: string;
}) => {
  const [closedPopup, setClosedPopup] = useState(true);

  const nextPagePath = () => {
    if (paginationData.nextPage) {
      return `/production-order/detail/${paginationData.nextPage.ProductionOrder}/${paginationData.nextPage.ProductionOrderItem}/${paginationData.userType}/${paginationData.nextPage.Product}`;
    }

    return null;
  }

  const prevPagePath = () => {
    if (paginationData.prevPage) {
      return `/production-order/detail/${paginationData.prevPage.ProductionOrder}/${paginationData.prevPage.ProductionOrderItem}/${paginationData.userType}/${paginationData.prevPage.Product}`;
    }

    return null;
  }

  return (
    <Detail className={clsx(
      `ContainerWrapper relative`,
      className
    )}
          prevPage={prevPagePath()}
          nextPage={nextPagePath()}
    >
      <Column className={'Column1'}>
        <BasicInfoElement
          productionOrder={data.ProductionOrder}
          productionOrderItem={data.ProductionOrderItem}
          productCode={data.Product}
          productName={data.ProductName}
          orderItemText={data.OrderItemText}
          mrpArea={data.MRPArea}
          productionVersion={data.ProductionVersion}
          productImage={data.Images?.Product}
          closedPopup={closedPopup}
          setClosedPopup={setClosedPopup}
        />
      </Column>
      <Column className={'Column2'}>
        <ProductDetail>
          <ProductDetailTopElement
            minimumLotSizeQuantity={data.MinimumLotSizeQuantity}
            maximumLotSizeQuantity={data.MaximumLotSizeQuantity}
            standardLotSizeQuantity={data.StandardLotSizeQuantity}
            lotSizeRoundingQuantity={data.LotSizeRoundingQuantity}
            productionOrderPlannedStartDate={data.ProductionOrderPlannedStartDate}
            productionOrderPlannedStartTime={data.ProductionOrderPlannedStartTime}
            productionOrderPlannedEndDate={data.ProductionOrderPlannedEndDate}
            productionOrderPlannedEndTime={data.ProductionOrderPlannedEndTime}
            productionOrderActualStartDate={data.ProductionOrderActualStartDate}
            productionOrderActualStartTime={data.ProductionOrderActualStartTime}
            productionOrderActualEndDate={data.ProductionOrderActualEndDate}
            productionOrderActualEndTime={data.ProductionOrderActualEndTime}
            totalQuantity={data.TotalQuantity}
            plannedScrapQuantity={data.PlannedScrapQuantity}
            confirmedYieldQuantity={data.ConfirmedYieldQuantity}
            productionUnit={data.ProductionUnit}
          />
          <ProductDetailBottomElement
            className={`${activeMenuTab === ActiveMenuTab.configurationItem ? '' : 'hidden'} fade-in`}
            productionPlant={data.ProductionPlant}
            productionPlantStorageLocation={data.ProductionPlantStorageLocation}
            components={data.Components || []}
            operations={data.Operations || []}
            activeMenuTab={activeMenuTab}
          />
          <ProductDetailBottomElement
            className={`${activeMenuTab === ActiveMenuTab.productionOrder ? '' : 'hidden'} fade-in`}
            productionPlant={data.ProductionPlant}
            productionPlantStorageLocation={data.ProductionPlantStorageLocation}
            components={data.Components || []}
            operations={data.Operations || []}
            activeMenuTab={activeMenuTab}
          />
        </ProductDetail>
      </Column>
    </Detail>
  );
};
