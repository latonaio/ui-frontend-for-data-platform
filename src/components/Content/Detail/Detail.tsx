import { clsx } from 'clsx';
import {
  Content as Root,
  Column,
  OrderInfo,
  OrderNumber,
  ProductCode,
  ProductDetail,
  ProductDetailTop,
  ProductDetailBottom,
  JanCode,
  Tag,
  Allergen,
  Calendar,
} from './Detail.style';
import { BorderSolidPanel } from './BorderSolidPanel/BorderSolidPanel';
import { StockLabel } from './StockLabel/StockLabel';
import { generateImageUrl } from '@/helpers/common';

export interface DetailProps {
  className?: string;
  data: {
    orderNumber: string;
    serialNumber: string;
    productCode: string;
    name: string;
    imageUrl: string;
    tags: string[];
    productInfo: ProductInfo[];
    allergen: Allergen[];
  };
}

interface AllergenProps {
  data: Allergen[]
}

interface Allergen {
  name: string;
  checked: boolean;
}

interface OrderInfoElement {
  orderNumber: string;
  serialNumber: string;
  productCode: string;
  name: string;
  imageUrl: string;
}

interface ProductDetailTopElement {
  productCode: string;
  tags: string[];
}

interface ProductInfo {
  key: string;
  value: string;
}

interface ProductDetailBottomElement {
  productInfo: ProductInfo[]
  allergen: Allergen[];
}

const AllergenElement = ({ data }: AllergenProps) => {
  return (
    <Allergen className={'flex justify-start'}>
      {data.map((item, index) => {
        return (
          <li key={index}>
            <div className={'definition'}>{item.name}</div>
            <div className={'mark'}>{item.checked ? '●' : ''}</div>
          </li>
        )
      })}
    </Allergen>
  )
}

const OrderInforElement = (data: OrderInfoElement) => {
  return (
    <>
      <OrderInfo>
        <OrderNumber className={'OrderNumber text-lg font-bold mb-3'}>
          <div>オーダー番号: {data.orderNumber}</div>
          <div>明細番号: {data.serialNumber}</div>
        </OrderNumber>
        <ProductCode className={'text-base font-bold'}>
          <div>品目コード： {data.productCode}</div>
          <div>品名：{data.name}</div>
        </ProductCode>
      </OrderInfo>
      <div>
        <img
          src={generateImageUrl(
            data.productCode,
            'product',
          )}
          alt={`${data.name}`}
        />
      </div>
    </>
  )
}

const ProductDetailTopElement = ({ productCode, tags }: ProductDetailTopElement) => {
  return (
    <>
      <ProductDetailTop className={'mb-10 flex justify-start items-center'}>
        <div className={'w-1/4'}>
          <div className={'text-center text-base font-bold'}>JANコード標準</div>
          <div className={'block text-center'}>
            <JanCode className={'inline-block'}>
              <img src={generateImageUrl(
                productCode,
                'jan',
              )}  alt={'JAN'}/>
            </JanCode>
          </div>
        </div>
        <div className={'w-3/4 ml-7'}>
          <BorderSolidPanel title={'タグ'}>
            <ul className={'clearfix'}>
              {tags.map((tag: string, index) => {
                return <Tag key={index}>#{tag}</Tag>;
              })}
            </ul>
          </BorderSolidPanel>
          <StockLabel />
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
                  <li key={index}>{item.key}: {item.value}</li>
                )
              })}
              <li className={'flex justify-start'}>
                <div>アレルゲン</div>
                <div>
                  <AllergenElement data={allergen} />
                </div>
              </li>
            </ul>
          </div>
        </BorderSolidPanel>
      </ProductDetailBottom>
    </>
  )
}

export const Detail = ({ data, className }: DetailProps) => {
  return (
    <Root className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <Column className={'Column1'}>
        <OrderInforElement
          orderNumber={data.orderNumber}
          serialNumber={data.serialNumber}
          productCode={data.productCode}
          name={data.name}
          imageUrl={data.imageUrl}
        />
      </Column>
      <Column className={'Column2'}>
        <ProductDetail>
          <ProductDetailTopElement
            productCode={data.productCode}
            tags={data.tags}
          />
          <ProductDetailBottomElement
            productInfo={data.productInfo}
            allergen={data.allergen}
          />
        </ProductDetail>
      </Column>
    </Root>
  );
};
