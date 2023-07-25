import { clsx } from 'clsx';
import {
  Column,
  OrderInfo,
  ProductCode,
  ProductDetail,
  ProductDetailTop,
  ProductDetailBottom,
  BarcodeWrapper,
  Barcode,
  BarcodeNumber,
  Tag,
  Allergen,
  Calendar,
  QuantityInfo,
} from './Detail.style';
import { BorderSolidPanel } from './BorderSolidPanel/BorderSolidPanel';
import { StockLabelStorageLocation, } from './StockLabel/StockLabel';
import { generateImageProductUrl, generateBarcodeImageUrl } from '@/helpers/common';
import { GreenInfoPanel } from './GreenInfoPanel/GreenInfoPanel';
import { WhiteButton } from '@/components/Button';
import { PublicImage } from '@/components/Image';
import { useState } from 'react';
import { Detail } from '@/components/Content/Detail/Detail';

import {
  Allergen as AllergenProps,
  ProductInfo,
  Stock,
  ProductTag,
  AvailabilityStock,
  BarcodeImage,
  ProductImage,
  AuthedUser,
  Quantity,
  DeliveryDocumentDetailProps,
} from '@/constants';
import { PopupTranslucent } from '@/components/Popup/Popup';

interface BasicInfoElement {
  plannedGoodsReceiptDate: string;
  actualGoodsReceiptDate: string;
  deliveryDocument: string;
  deliveryDocumentItem: string;
  productCode: string;
  productName: string;
  productImage: ProductImage;
  businessPartner: AuthedUser['businessPartner'];
  closedPopup: boolean;
  setClosedPopup: (closedPopup: boolean) => void;
  ordersInfo: {
    OrderID: number;
    OrderItem: number;
    Product: string;
    Buyer: number;
  }
}

interface ProductDetailTopElement {
  stock: Stock;
  productTag: ProductTag[];
  availabilityStock: AvailabilityStock;
  productStandardId: string;
  barcode: BarcodeImage;
  tags: string[];
  orderQuantityInDelivery: Quantity;
  orderQuantityInBase: Quantity;
  plannedGoodsIssueQuantity: Quantity;
  plannedGoodsIssueQtyInBaseUnit: Quantity;
  confirmedOrderQuantityByPDTAvailCheck: Quantity;
  storageLocationFullName: string;
  storageBin: string;
  deliverToPlantBatchValidityEndDate: string;
  deliverToPlantBatchValidityEndTime: string;
}

interface ProductDetailBottomElement {
  productInfo: ProductInfo[];
}

const AllergenElement = (Allergens: AllergenProps[]) => {
  return (
    <Allergen>
      <ul className={'flex justify-start'}>
        {Allergens.map((item, index) => {
          return (
            <li key={index}>
              <div className={'definition'}>{item.AllergenName}</div>
              <div className={'mark'}>{item.AllergenIsContained ? '●' : ''}</div>
            </li>
          );
        })}
      </ul>
    </Allergen>
  );
};

const BasicInfoElement = (data: Partial<BasicInfoElement>) => {
  return (
    <>
      <OrderInfo>
        <GreenInfoPanel
          className={'text-lg font-bold mb-3 deliveryDocumentDetail deliveryDocumentDetail-icon'}
        >
          <div>入出荷完了予定日: {data.plannedGoodsReceiptDate}</div>
          <div>実際入出荷完了日: {data.actualGoodsReceiptDate}</div>
          <div>入出荷番号: {data.deliveryDocument}</div>
          <div>明細番号: {data.deliveryDocumentItem}</div>
          <div className={'iconWrapper'}>
            <div
              className={'icon iconEdit'}
            >
              <PublicImage
                imageName={'iconEdit'}
                width={50}
                href={`/orders/detail/${data.ordersInfo?.OrderID}/${data.ordersInfo?.OrderItem}/buyer/${data.ordersInfo?.Product}`}
              />
            </div>
            <div
              className={'icon iconInvoice'}
            >
              <PublicImage
                imageName={'iconInvoice'}
                width={50}
              />
            </div>
          </div>
          <div
            className={'imgBox'}
            onClick={() => {
              data.setClosedPopup && data.setClosedPopup(!data.closedPopup);
          }}>
            <PublicImage
              imageName={'imgBox'}
              width={80}
            />
          </div>
        </GreenInfoPanel>
        <ProductCode className={'text-base font-bold'}>
          <div>品目コード： {data.productCode}</div>
          <div>品名：{data.productName}</div>
        </ProductCode>
      </OrderInfo>
      <div>
        <img
          src={data.productImage &&
            generateImageProductUrl(
              data.businessPartner ? data.businessPartner.toString() : null, data.productImage
            )}
          alt={`${data.productName}`}
        />
      </div>
    </>
  )
}

const ProductDetailTopElement = ({
                                   stock,
                                   barcode,
                                   productTag,
                                   orderQuantityInDelivery,
                                   orderQuantityInBase,
                                   plannedGoodsIssueQuantity,
                                   plannedGoodsIssueQtyInBaseUnit,
                                   confirmedOrderQuantityByPDTAvailCheck,
                                   storageLocationFullName,
                                   storageBin,
                                   deliverToPlantBatchValidityEndDate,
                                   deliverToPlantBatchValidityEndTime,
                                 }: Partial<ProductDetailTopElement>) => {
  return (
    <>
      <ProductDetailTop className={'mb-10 flex justify-start items-top'}>
        <div className={'barcodeWrapper'}>
          <div className={'text-center text-base font-bold'}>JANコード標準</div>
          <BarcodeWrapper className={'block text-center'}>
            <Barcode className={'inline-block'}>
              {barcode && <img src={generateBarcodeImageUrl(
                barcode,
              )} alt={'Barcode'}/>}
            </Barcode>
            <BarcodeNumber>{barcode?.Id}</BarcodeNumber>
          </BarcodeWrapper>
          <QuantityInfo>
            <div className={'flex flex-row justify-between items-center panel'}>
              <div>入出荷数量:</div>
              <div>{plannedGoodsIssueQuantity?.Quantity}/{orderQuantityInDelivery?.Unit}</div>
            </div>
            <div className={'flex flex-row justify-between items-center panel'}>
              <div>基本数量:</div>
              <div>{plannedGoodsIssueQtyInBaseUnit?.Quantity}/{plannedGoodsIssueQtyInBaseUnit?.Unit}</div>
            </div>
          </QuantityInfo>
        </div>
        <div className={'w-3/4 ml-7'}>
          <div className={'flex justify-start items-center'}>
            <BorderSolidPanel
              className={'w-4/5 minHeight-48'}
              title={'タグ'}
            >
              <ul className={'clearfix'}>
                {productTag && productTag
                  .sort((a, b) => b.Doc_count - a.Doc_count)
                  .map((tag: ProductTag, index) => {
                    return <Tag key={index}>#{tag.Key}</Tag>;
                  })}
              </ul>
            </BorderSolidPanel>
            <WhiteButton className={'ml-2'}>MAP</WhiteButton>
          </div>
          <StockLabelStorageLocation
            stock={stock}
            storageLocationFullName={storageLocationFullName}
            storageBin={storageBin}
            deliverToPlantBatchValidityEndDate={deliverToPlantBatchValidityEndDate}
            deliverToPlantBatchValidityEndTime={deliverToPlantBatchValidityEndTime}
          />
        </div>
      </ProductDetailTop>
    </>
  )
}

const ProductDetailBottomElement = ({ productInfo }: ProductDetailBottomElement) => {
  return (
    <>
      <ProductDetailBottom>
        <BorderSolidPanel title={'商品情報'}>
          <Calendar className="text-3xl icon-calendar-check-o"></Calendar>
          <div>
            <ul>
              {productInfo.map((item, index) => {
                if (item.KeyName === 'Allergen') {
                  return (
                    <li className={''}>
                      <div>アレルゲン</div>
                      <div>
                        {AllergenElement(item.Value)}
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={index}>{item.Key}: {item.Value}</li>
                )
              })}
            </ul>
          </div>
        </BorderSolidPanel>
      </ProductDetailBottom>
    </>
  )
}

export const DeliveryDocumentDetail = ({ data, className, paginationData }: {
  className?: string;
  data: Partial<DeliveryDocumentDetailProps>;
  paginationData: any;
}) => {
  const [closedPopup, setClosedPopup] = useState(true);

  const nextPagePath = () => {
    if (paginationData.nextPage) {
      return `/delivery-document/detail/${paginationData.nextPage.DeliveryDocument}/${paginationData.nextPage.DeliveryDocumentItem}/${paginationData.userType}/${paginationData.nextPage.Product}`;
    }

    return null;
  }

  const prevPagePath = () => {
    if (paginationData.prevPage) {
      return `/delivery-document/detail/${paginationData.prevPage.DeliveryDocument}/${paginationData.prevPage.DeliveryDocumentItem}/${paginationData.userType}/${paginationData.prevPage.Product}`;
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
          plannedGoodsReceiptDate={data.PlannedGoodsReceiptDate}
          actualGoodsReceiptDate={data.ActualGoodsReceiptDate}
          deliveryDocument={data.DeliveryDocument}
          deliveryDocumentItem={data.DeliveryDocumentItem}
          productCode={data.ProductCode}
          productName={data.ProductName}
          productImage={data.Images?.Product}
          businessPartner={data.BusinessPartner}
          ordersInfo={data.OrdersDetailJumpReq}
          closedPopup={closedPopup}
          setClosedPopup={setClosedPopup}
        />
      </Column>
      <Column className={'Column2'}>
        <ProductDetail>
          <ProductDetailTopElement
            stock={data.Stock}
            barcode={data.Images?.Barcode}
            productTag={data.ProductTag}
            orderQuantityInDelivery={data.OrderQuantityInDelivery}
            orderQuantityInBase={data.OrderQuantityInBase}
            plannedGoodsIssueQuantity={data.PlannedGoodsIssueQuantity}
            plannedGoodsIssueQtyInBaseUnit={data.PlannedGoodsIssueQtyInBaseUnit}
            confirmedOrderQuantityByPDTAvailCheck={data.ConfirmedOrderQuantityByPDTAvailCheck}
            storageLocationFullName={data.StorageLocationFullName}
            storageBin={data.StorageBin}
            deliverToPlantBatchValidityEndDate={data.DeliverToPlantBatchValidityEndDate}
            deliverToPlantBatchValidityEndTime={data.DeliverToPlantBatchValidityEndTime}
          />
          <ProductDetailBottomElement
            productInfo={data.ProductInfo || []}
          />
        </ProductDetail>
      </Column>
      <PopupTranslucent
        title={'入出荷情報'}
        closedPopup={closedPopup}
        setClosedPopup={setClosedPopup}
      >
        <div className={'flex justify-start items-top'}>
          <div className={'leftColumn'}>
            <div className={'leftColumnSection mb-5'}>
              <div className={'title flex justify-start items-center'}>
                <i className="icon-schedule" />
                <span>予定</span>
              </div>
              <div className={'content'}>
                <ul>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>出荷日時:</div>
                    <div className={'listContent'}>{data.PlannedGoodsIssueDate}/{data.PlannedGoodsIssueTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>入荷日時:</div>
                    <div className={'listContent'}>{data.PlannedGoodsReceiptDate}/{data.PlannedGoodsReceiptTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>出荷数量:</div>
                    <div className={'listContent'}>{data.PlannedGoodsIssueQuantity?.Quantity}/{data.PlannedGoodsIssueQuantity?.Unit}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>入荷数量:</div>
                    <div className={'listContent'}>{data.PlannedGoodsReceiptQuantity?.Quantity}/{data.PlannedGoodsReceiptQuantity?.Unit}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>出荷数量(基本数量):</div>
                    <div className={'listContent'}>{data.PlannedGoodsIssueQtyInBaseUnit?.Quantity}/{data.PlannedGoodsIssueQtyInBaseUnit?.Unit}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>入荷数量(基本数量):</div>
                    <div className={'listContent'}>{data.PlannedGoodsReceiptQtyInBaseUnit?.Quantity}/{data.PlannedGoodsReceiptQtyInBaseUnit?.Unit}</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className={'leftColumnSection'}>
              <div className={'title flex justify-start items-center'}>
                <i className="icon-truck" />
                <span>実際</span>
              </div>
              <div className={'content'}>
                <ul>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>出荷日時:</div>
                    <div className={'listContent'}>{data.ActualGoodsIssueDate}/{data.ActualGoodsIssueTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>入荷日時:</div>
                    <div className={'listContent'}>{data.ActualGoodsReceiptDate}/{data.ActualGoodsReceiptTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>出荷数量:</div>
                    <div className={'listContent'}>{data.ActualGoodsIssueQuantity?.Quantity}/{data.ActualGoodsIssueQuantity?.Unit}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>入荷数量:</div>
                    <div className={'listContent'}>{data.ActualGoodsReceiptQuantity?.Quantity}/{data.ActualGoodsReceiptQuantity?.Unit}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>出荷数量(基本数量):</div>
                    <div className={'listContent'}>{data.ActualGoodsIssueQtyInBaseUnit?.Quantity}/{data.ActualGoodsIssueQtyInBaseUnit?.Unit}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>入荷数量(基本数量):</div>
                    <div className={'listContent'}>{data.ActualGoodsReceiptQtyInBaseUnit?.Quantity}/{data.ActualGoodsReceiptQtyInBaseUnit?.Unit}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={'rightColumn'}>
            <div className={'leftColumnSection'}>
              <div className={'title flex justify-start items-center'}>
                <i className="icon-lot" />
                <span>ロット</span>
              </div>
              <div className={'content'}>
                <ul>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>(入出荷先)</div>
                    <div className={'listContent'}></div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>ロット:</div>
                    <div className={'listContent'}>{data.DeliverToPlantBatch}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>管理方針:</div>
                    <div className={'listContent'}>{data.BatchMgmtPolicyInDeliverToPlant}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>有効開始日時:</div>
                    <div className={'listContent'}>{data.DeliverToPlantBatchValidityStartDate}/{data.DeliverToPlantBatchValidityStartTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>有効終了日時:</div>
                    <div className={'listContent'}>{data.DeliverToPlantBatchValidityEndDate}/{data.DeliverToPlantBatchValidityEndTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>(入出荷元)</div>
                    <div className={'listContent'}></div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>ロット:</div>
                    <div className={'listContent'}>{data.DeliverFromPlantBatch}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>管理方針:</div>
                    <div className={'listContent'}>{data.BatchMgmtPolicyInDeliverFromPlant}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>有効開始日時:</div>
                    <div className={'listContent'}>{data.DeliverFromPlantBatchValidityStartDate}/{data.DeliverFromPlantBatchValidityStartTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>有効終了日時:</div>
                    <div className={'listContent'}>{data.DeliverFromPlantBatchValidityEndDate}/{data.DeliverFromPlantBatchValidityEndTime}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </PopupTranslucent>
    </Detail>
  );
};
