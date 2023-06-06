import { clsx } from 'clsx';
import {
  Content as Root,
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
  LocationWrapper,
  Location,
  QuantityInfo,
} from './Detail.style';
import { BorderSolidPanel } from './BorderSolidPanel/BorderSolidPanel';
import { StockLabel, LabelPanelToday } from './StockLabel/StockLabel';
import { generateImageProductUrl, generateBarcodeImageUrl } from '@/helpers/common';
import { GreenInfoPanel } from './GreenInfoPanel/GreenInfoPanel';
import {
  OrdersProductDetailProps,
  BusinessPartnerDetailProps,
  Allergen as AllergenProps,
  ProductInfo,
  Stock,
  ProductTag,
  AvailabilityStock, BarcodeImage, ProductImage, AuthedUser, Quantity,
} from '@/constants';

interface OrderInfoElement {
  orderId: string;
  orderItem: string;
  productCode: string;
  productName: string;
  productImage: ProductImage;
  businessPartner: AuthedUser['businessPartner'];
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
  allergen: AllergenProps[];
}

const AllergenElement = ({ allergens }: { allergens: AllergenProps[] }) => {
  return (
    <Allergen className={'flex justify-start'}>
      {allergens.map((item, index) => {
        return (
          <li key={index}>
            <div className={'definition'}>{item.AllergenName}</div>
            <div className={'mark'}>{item.AllergenIsContained ? '●' : ''}</div>
          </li>
        )
      })}
    </Allergen>
  )
}

const OrderInfoElement = (data: Partial<OrderInfoElement>) => {
  return (
    <>
      <OrderInfo>
        <GreenInfoPanel
          className={'OrderNumber text-lg font-bold mb-3'}
        >
          <div>オーダー番号: {data.orderId}</div>
          <div>明細番号: {data.orderItem}</div>
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
                                   barcode,
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
                {productTag && productTag.sort((a, b) => b.Doc_count - a.Doc_count).map((tag: ProductTag, index) => {
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

const ProductDetailBottomElement = ({ productInfo, allergen }: ProductDetailBottomElement) => {
  return (
    <>
      <ProductDetailBottom>
        <BorderSolidPanel title={'商品情報'}>
          <Calendar className="text-3xl icon-calendar-check-o"></Calendar>
          <div>
            <ul>
              {productInfo.map((item, index) => {
                return (
                  <li key={index}>{item.Key}: {item.Value}</li>
                )
              })}
              {/*<li className={'flex justify-start'}>*/}
              {/*  <div>アレルゲン</div>*/}
              {/*  <div>*/}
              {/*    <AllergenElement allergens={allergen} />*/}
              {/*  </div>*/}
              {/*</li>*/}
            </ul>
          </div>
        </BorderSolidPanel>
      </ProductDetailBottom>
    </>
  )
}

export const BusinessPartnerDetail = ({ data, className }: {
  className?: string;
  data: Partial<BusinessPartnerDetailProps>;
}) => {
  return (
    <>
      <Root className={clsx(
        `ContainerWrapper block`,
        className
      )}>
        <div className={'flex space-x-2 items-center mb-5'}>
          <div className={'w-2/5'}>
            <GreenInfoPanel
              className={'OrderNumber text-lg font-bold'}
            >
              <div>パートナーID: {data.businessPartner}</div>
              <div>パートナー名: {data.businessPartnerName}</div>
            </GreenInfoPanel>
          </div>
          <div className={'w-3/5 text-center'}>
            <div className={'inline-block'}>
              <LocationWrapper className={'flex'}>
                <Location className={'ml-6'}>
                  <div>Local Region</div>
                  <div>{data.localRegion}</div>
                  <i className="text-3xl icon-location"></i>
                </Location>
                <Location className={'ml-6'}>
                  <div>District</div>
                  <div>{data.district}</div>
                  <i className="text-3xl icon-location2"></i>
                </Location>
              </LocationWrapper>
            </div>
          </div>
        </div>
        <div className={'relative text-lg'}>
          <div className={'flex underline mb-5'}>
            <div className={'w-3/6'}>関係: {data.relation}</div>
            <div className={'w-3/6'}>担当者名: {data.personInCharge}</div>
          </div>
          <div className={'mb-2'}>所在地: {data.location}</div>
          <div className={'mb-2'}>所在施設: {data.locationFacility}</div>
          <div className={'mb-2'}>電話番号: {data.phoneNumber}</div>
          <div className={'mb-2'}>メールアドレス: {data.emailAddress}</div>
          <BorderSolidPanel
            className={'text-base absolute bottom-0 right-0'}
            title={'タグ'}
          >
            <ul className={'clearfix'}>
              {data.tags &&
                data.tags.map((tag: string, index) => {
                  return <Tag className={'float-none block'} key={index}>#{tag}</Tag>;
              })}
            </ul>
          </BorderSolidPanel>
        </div>
      </Root>
    </>
  )
};
