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
  ImgLeaf,
  LocationWrapper,
  Location,
  QuantityInfo,
} from './Detail.style';
import { BorderSolidPanel } from './BorderSolidPanel/BorderSolidPanel';
import { StockLabel, LabelPanelToday } from './StockLabel/StockLabel';
import { generateImageProductUrl, generateBarcodeImageUrl } from '@/helpers/common';
import { GreenInfoPanel } from './GreenInfoPanel/GreenInfoPanel';
import { Detail } from '@/components/Content/Detail/Detail';
import {
  OrdersProductDetailProps,
  Allergen as AllergenProps,
  ProductInfo,
  Stock,
  ProductTag,
  AvailabilityStock,
  BarcodeImage,
  ProductImage,
  AuthedUser,
  Quantity,
} from '@/constants';
import { PublicImage } from '@/components/Image';
import { PopupTranslucent } from '@/components/Popup/Popup';
import { useState } from 'react';

interface BasicInfoElement {
  orderId: string;
  orderItem: string;
  productCode: string;
  productName: string;
  productImage: ProductImage;
  businessPartner: AuthedUser['businessPartner'];
  deliveryDocumentInfoPopup: boolean;
  setDeliveryDocumentInfoPopup: (closedPopup: boolean) => void;
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
  confirmedOrderQuantityByPDTAvailCheck: Quantity;
}

interface ProductDetailBottomElement {
  productInfo: ProductInfo[];
  closedPopup: boolean;
  setClosedPopup: (closedPopup: boolean) => void;
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
          <div>オーダー番号: {data.orderId}</div>
          <div>明細番号: {data.orderItem}</div>
          <div className={'iconWrapper'}>
            <div
              className={'icon iconEdit'}
            >
              <PublicImage
                imageName={'iconEdit'}
                width={50}
                href={``}
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
              data.setDeliveryDocumentInfoPopup && data.setDeliveryDocumentInfoPopup(!data.deliveryDocumentInfoPopup);
            }}>
            <PublicImage imageName={'imgBox'} />
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
            generateImageProductUrl(data.businessPartner ? data.businessPartner.toString() : null, data.productImage)}
          alt={`${data.productName}`}
        />
      </div>
    </>
  )
}

const ProductDetailTopElement = ({
                                   stock,
                                   availabilityStock,
                                   barcode: barcode,
                                   productTag,
                                   orderQuantityInDelivery,
                                   orderQuantityInBase,
                                   confirmedOrderQuantityByPDTAvailCheck,
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
              <div>{orderQuantityInDelivery?.Quantity}/{orderQuantityInDelivery?.Unit}</div>
            </div>
            <div className={'flex flex-row justify-between items-center panel'}>
              <div>基本数量:</div>
              <div>{orderQuantityInBase?.Quantity}/{orderQuantityInBase?.Unit}</div>
            </div>
            <div className={'flex flex-row justify-between items-center panel'}>
              <div>引当済数量:</div>
              <div>{confirmedOrderQuantityByPDTAvailCheck?.Quantity}/{confirmedOrderQuantityByPDTAvailCheck?.Unit}</div>
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
            <LabelPanelToday className={'mb-2'} />
          </div>
          <StockLabel
            stock={stock}
            availabilityStock={availabilityStock}
          />
        </div>
      </ProductDetailTop>
    </>
  )
}

const ProductDetailBottomElement = ({
                                      productInfo,
                                      closedPopup,
                                      setClosedPopup,
                                    }: ProductDetailBottomElement) => {
  return (
    <>
      <ProductDetailBottom className={'relative'}>
        <BorderSolidPanel title={'商品情報'}>
          <ImgLeaf
            onClick={() => {
              setClosedPopup && setClosedPopup(!closedPopup);
            }}
          >
            <PublicImage imageName={'imgLeaf'} />
          </ImgLeaf>
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

export const OrdersDetail = ({ data, className, paginationData }: {
  className?: string;
  data: Partial<OrdersProductDetailProps>;
  paginationData: any;
}) => {
  const [closedPopup, setClosedPopup] = useState(true);
  const [deliveryDocumentInfoPopup, setDeliveryDocumentInfoPopup] = useState(true);

  const nextPagePath = () => {
    if (paginationData.nextPage) {
      return `/orders/detail/${paginationData.nextPage.OrderID}/${paginationData.nextPage.OrderItem}/${paginationData.userType}/${paginationData.nextPage.Product}`;
    }

    return null;
  }

  const prevPagePath = () => {
    if (paginationData.prevPage) {
      return `/orders/detail/${paginationData.prevPage.OrderID}/${paginationData.prevPage.OrderItem}/${paginationData.userType}/${paginationData.prevPage.Product}`;
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
          orderId={data.OrderID}
          orderItem={data.OrderItem}
          productCode={data.Product}
          productName={data.ProductName}
          productImage={data.Images?.Product}
          businessPartner={data.BusinessPartner}
          deliveryDocumentInfoPopup={deliveryDocumentInfoPopup}
          setDeliveryDocumentInfoPopup={setDeliveryDocumentInfoPopup}
        />
      </Column>
      <Column className={'Column2'}>
        <ProductDetail className={'relative'}>
          <ProductDetailTopElement
            stock={data.Stock}
            availabilityStock={data.AvailabilityStock}
            barcode={data.Images?.Barcode}
            productTag={data.ProductTag}
            orderQuantityInDelivery={data.OrderQuantityInDelivery}
            orderQuantityInBase={data.OrderQuantityInBase}
            confirmedOrderQuantityByPDTAvailCheck={data.ConfirmedOrderQuantityByPDTAvailCheck}
          />
          <ProductDetailBottomElement
            productInfo={data.ProductInfo || []}
            closedPopup={closedPopup}
            setClosedPopup={setClosedPopup}
          />
          <PopupTranslucent
            className={'compositionTable'}
            closedPopup={closedPopup}
            setClosedPopup={setClosedPopup}
          >
            <div className={'body'}>
              <ul>
                <li className={'flex justify-start items-top'}>
                  <div className={'name'}>
                    {/*エネルギー/熱量*/}
                  </div>
                  <div className={'value'}>
                    {/*146 kcal*/}
                  </div>
                </li>
              </ul>
            </div>
          </PopupTranslucent>
        </ProductDetail>
      </Column>
      <PopupTranslucent
        title={'入出荷情報'}
        closedPopup={deliveryDocumentInfoPopup}
        setClosedPopup={setDeliveryDocumentInfoPopup}
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
                    <div className={'listTitle'}>納入日時:</div>
                    <div className={'listContent'}>{data.Popup?.RequestedDeliveryDate}/{data.Popup?.RequestedDeliveryTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>在庫確認済納入日付:</div>
                    <div className={'listContent'}>{data.Popup?.ConfirmedDeliveryDate}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>基本数量:</div>
                    <div className={'listContent'}>{data.Popup?.OrderQuantityInBaseUnit}/{data.Popup?.BaseUnit}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>入出荷数量:</div>
                    <div className={'listContent'}>{data.Popup?.OrderQuantityInDeliveryUnit}/{data.Popup?.DeliveryUnit}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>引当済数量:</div>
                    <div className={'listContent'}>{data.Popup?.ConfirmedOrderQuantityByPDTAvailCheckInBaseUnit}/{data.Popup?.BaseUnit}</div>
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
                    <div className={'listContent'}>{data.Popup?.DeliverToPlantBatch}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>管理方針:</div>
                    <div className={'listContent'}>{data.Popup?.BatchMgmtPolicyInDeliverToPlant}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>有効開始日時:</div>
                    <div className={'listContent'}>{data.Popup?.DeliverToPlantBatchValidityStartDate}/{data.Popup?.DeliverToPlantBatchValidityStartTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>有効終了日時:</div>
                    <div className={'listContent'}>{data.Popup?.DeliverToPlantBatchValidityEndDate}/{data.Popup?.DeliverToPlantBatchValidityEndTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>(入出荷元)</div>
                    <div className={'listContent'}></div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>ロット:</div>
                    <div className={'listContent'}>{data.Popup?.DeliverFromPlantBatch}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>管理方針:</div>
                    <div className={'listContent'}>{data.Popup?.BatchMgmtPolicyInDeliverFromPlant}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>有効開始日時:</div>
                    <div className={'listContent'}>{data.Popup?.DeliverFromPlantBatchValidityStartDate}/{data.Popup?.DeliverFromPlantBatchValidityStartTime}</div>
                  </li>
                  <li className={'flex justify-start items-center'}>
                    <div className={'listTitle'}>有効終了日時:</div>
                    <div className={'listContent'}>{data.Popup?.DeliverFromPlantBatchValidityEndDate}/{data.Popup?.DeliverFromPlantBatchValidityEndTime}</div>
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
