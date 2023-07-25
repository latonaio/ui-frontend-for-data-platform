import { clsx } from 'clsx';
import {
  Column,
  OrderInfo,
  ProductDetail,
  ProductDetailTop,
  ProductDetailInternalCapacityListTable,
} from './Detail.style';
import { generateImageProductUrl } from '@/helpers/common';
import { Detail } from '@/components/Content/Detail/Detail';
import {
  ProductImage,
  ProductTablesEnum,
} from '@/constants';
import { ProductImageLabel } from '@/components/Label';
import { rem } from 'polished';
import { DisplayData } from '@/pages/product/detail/[userType]/[content]/[product]';
import {
  ExConfsHeader,
  ExConfsHeaderImage,
  ExConfsHeaderInfo, ExConfsHeaderInfoBottom, ExConfsHeaderInfoTop,
  ExConfsHeaderWrapper
} from '@/components/Content/Detail/ProductDetailExconfList.style';

interface BasicInfoElement {
  [key: string]: any;
}

interface ProductDetailTopElement {
  [key: string]: any;
}

interface ProductDetailBottomElement {
}

const BasicInfoElement = (data: Partial<BasicInfoElement>) => {
  return (
    <>
      <OrderInfo>
        <ProductImageLabel
          style={{
            marginTop: rem(3),
            marginBottom: rem(20),
          }}
        >
          {data.content}
        </ProductImageLabel>
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
                                   params,
                                   content,
                                 }: Partial<ProductDetailTopElement>) => {
  return (
    <>
      <ProductDetailTop className={'mb-4'}>
        {/* BPPlant */}
        {content === 'BPPlant' && (
          <div>
            <div
              className={'flex justify-start items-center'}
              style={{
                marginLeft: rem(10),
                marginBottom: rem(26),
              }}
            >
              <div style={{
                fontSize: rem(18),
              }}>ビジネスパートナ: </div>
              <ProductImageLabel
                className={'blue small'}
                style={{
                  marginLeft: rem(20),
                  width: rem(300),
                }}
              >{params.BusinessPartner}</ProductImageLabel>
            </div>
            <div
              className={'flex justify-start items-center'}
              style={{
                marginLeft: rem(10),
                marginBottom: rem(26),
              }}
            >
              <div style={{
                fontSize: rem(18),
              }}>プラント: </div>
              <ProductImageLabel
                className={'brown small'}
                style={{
                  marginLeft: rem(92),
                  width: rem(300),
                }}
              >{params.Plant}</ProductImageLabel>
            </div>
            <div>
              <ProductDetailInternalCapacityListTable>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>利用可能在庫確認タイプ: {params.AvailabilityCheckType}</div>
                    <div className={'w-2/4'}>標準入出荷ロットサイズ数量: {params.StandardDeliveryLotSizeQuantityInBaseUnit}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>MRPタイプ: {params.AvailabilityCheckType}</div>
                    <div className={'w-2/4'}>入出荷ロットサイズ丸め数量: {params.DeliveryLotSizeRoundingQuantityInBaseUnit}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>MRP管理者: {params.MRPController}</div>
                    <div className={'w-2/4'}>最大入出荷ロットサイズ数量: {params.MaximumDeliveryLotSizeQuantityInBaseUnit}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>発注点数量: {params.ReorderThresholdQuantity}</div>
                    <div className={'w-2/4'}>最大入出荷数量: {params.MinimumDeliveryQuantityInBaseUnit}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>計画タイムフェンス: {params.PlanningTimeFence}</div>
                    <div className={'w-2/4'}>入出荷ロットサイズ固定フラグ: {params.DeliveryLotSizeIsFixed}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>MRP計画カレンダー: {params.MRPPlanningCalendar}</div>
                    <div className={'w-2/4'}>標準入出荷日数: {params.StandardDeliveryDurationInDays}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>安全在庫数量: {params.SafetyStockQuantityInBaseUnit}</div>
                    <div className={'w-2/4'}>ロット管理必須: {params.IsBatchManagementRequired.toString()}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>安全在庫日数: {params.SafetyDuration}</div>
                    <div className={'w-2/4'}>ロット管理方針: {params.BatchManagementPolicy}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>最大在庫数量: {params.MaximumStockQuantityInBaseUnit}</div>
                    <div className={'w-2/4'}>在庫数量単位: {params.InventoryUnit}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>最小入出荷数量: {params.MinimumDeliveryQuantityInBaseUnit}</div>
                    <div className={'w-2/4'}>利益センタ: {params.ProfitCenter}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>最小入出荷ロットサイズ数量: {params.AvailabilityCheckType}</div>
                    <div className={'w-2/4'}>削除フラグ: {params.StandardDeliveryLotSizeQuantityInBaseUnit}</div>
                  </div>
                </li>
              </ProductDetailInternalCapacityListTable>
            </div>
          </div>
        )}
        {/* BP */}
        {content === 'BP' && (
          <div>
            <div
              className={'flex justify-start items-center'}
              style={{
                marginLeft: rem(10),
                marginBottom: rem(26),
              }}
            >
              <div style={{
                fontSize: rem(18),
              }}>ビジネスパートナ: </div>
              <ProductImageLabel
                className={'blue small'}
                style={{
                  marginLeft: rem(20),
                  width: rem(300),
                }}
              >{params.BusinessPartner}</ProductImageLabel>
            </div>
            <div>
              <ProductDetailInternalCapacityListTable>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>有効終了日付: {params.ValidityEndDate}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>有効開始日付: {params.ValidityStartDate}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>ビジネスパートナ品目: {params.BusinessPartnerProduct}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>削除フラグ: {params.IsMarkedForDeletion?.toString()}</div>
                  </div>
                </li>
              </ProductDetailInternalCapacityListTable>
            </div>
          </div>
        )}

        {/* General */}
        {content === 'General' && (
          <div>
            <ProductDetailInternalCapacityListTable>
              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>品目タイプ: {params.ProductType}</div>
                  <div className={'w-2/4'}>明細カテゴリ: {params.ItemCategory}</div>
                </div>
              </li>
              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>総重量: {params.GrossWeight}</div>
                  <div className={'w-2/4'}>原産国: {params.CountryOfOrigin}</div>
                </div>
              </li>
              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>正味重量: {params.NetWeight}</div>
                  <div className={'w-2/4'}>原産国言語: {params.CountryOfOriginLanguage}</div>
                </div>
              </li>

              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>重量単位: {params.WeightUnit}</div>
                  <div className={'w-2/4'}>バーコードタイプ: {params.BarcodeType}</div>
                </div>
              </li>
              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>内容量: {params.InternalCapacityQuantity}</div>
                  <div className={'w-2/4'}>品目勘定設定グループ: {params.ProductAccountAssignmentGroup}</div>
                </div>
              </li>
              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>内容量単位: {params.InternalCapacityQuantityUnit}</div>
                  <div className={'w-2/4'}>登録日付: {params.CreationDate}</div>
                </div>
              </li>
              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>サイズ/寸法: {params.SizeOrDimensionText}</div>
                  <div className={'w-2/4'}>最終更新日付: {params.LastChangeDate}</div>
                </div>
              </li>
              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>国際商品コード: {params.ProductStandardID}</div>
                  <div className={'w-2/4'}>削除フラグ: {params.IsMarkedForDeletion.toString()}</div>
                </div>
              </li>
              <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>国際商品名称: {params.IndustryStandardName}</div>
                </div>
              </li>
            </ProductDetailInternalCapacityListTable>
          </div>
        )}

		{/* Storage Location */}
        {content === 'Storage Location' && (
          <div>
            <div
              className={'flex justify-start items-center'}
              style={{
                marginLeft: rem(10),
                marginBottom: rem(26),
              }}
            >
              <div style={{
                fontSize: rem(18),
              }}>ビジネスパートナ: </div>
              <ProductImageLabel
                className={'blue small'}
                style={{
                  marginLeft: rem(20),
                  width: rem(300),
                }}
              >{params.BusinessPartner}</ProductImageLabel>
            </div>
            <div
              className={'flex justify-start items-center'}
              style={{
                marginLeft: rem(10),
                marginBottom: rem(26),
              }}
            >
              <div style={{
                fontSize: rem(18),
              }}>プラント: </div>
              <ProductImageLabel
                className={'brown small'}
                style={{
                  marginLeft: rem(92),
                  width: rem(300),
                }}
              >{params.Plant}</ProductImageLabel>
            </div>
			<div>保管場所 : {params.StorageLocation}</div>
            <div>
              <ProductDetailInternalCapacityListTable>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>ブロックステータス: {params.BlockStatus}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>登録日付: {params.CreationDate}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>最終更新日付: {params.LastCangeDate}</div>
                  </div>
                </li>
                <li>
                  <div className={'flex justify-start items-center'}>
                    <div className={'w-2/4'}>削除フラグ: {params.IsMarkedForDeletion}</div>
                  </div>
                </li>
              </ProductDetailInternalCapacityListTable>
            </div>
          </div>
        )}
      </ProductDetailTop>
    </>
  )
}

const ProductDetailBottomElement = ({}: Partial<ProductDetailBottomElement>) => {
  return (
    <div>
    </div>
  )
}

export const ProductDetailContent = ({
                                       data,
                                       className,
}: {
  data: DisplayData;
  className?: string;
}) => {
  const contentDisplayData = {
    images: data &&
      data[ProductTablesEnum.productDetailExconfListHeader]?.Images,
    params: data &&
      data[ProductTablesEnum.productDetailExconfList]
        ?.Existences.find(
          (item) => item.Content === data.content)
        ?.Param[0],
  }

  const productDetailExconfListHeader = data && data[ProductTablesEnum.productDetailExconfListHeader];

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
          <ExConfsHeaderImage>
            <img
              src={productDetailExconfListHeader?.Images &&
                generateImageProductUrl(
                  productDetailExconfListHeader.Images?.Product?.BusinessPartnerID ?
                    productDetailExconfListHeader.Images.Product.BusinessPartnerID.toString() : null,
                  productDetailExconfListHeader.Images?.Product
                )}
              alt={`${productDetailExconfListHeader?.ProductGroup}`}
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
              <ExConfsHeaderInfoTop>品目グループ: {productDetailExconfListHeader?.ProductGroup}</ExConfsHeaderInfoTop>
              <ExConfsHeaderInfoBottom>　</ExConfsHeaderInfoBottom>
            </ExConfsHeaderInfo>
          </div>
        </ExConfsHeaderWrapper>
      </ExConfsHeader>
      <Detail className={clsx(
        `ContainerWrapper relative`,
        className
      )}
        // prevPage={prevPagePath()}
        // nextPage={nextPagePath()}
      >
        <Column className={'Column1'}>
          <BasicInfoElement
            content={data && data.content}
            productImage={contentDisplayData.images?.Product as unknown as ProductImage}
          />
        </Column>
        <Column className={'Column2'}>
          <ProductDetail>
            <ProductDetailTopElement
              params={contentDisplayData.params}
              content={data && data.content}
            />
            <ProductDetailBottomElement
            />
          </ProductDetail>
        </Column>
      </Detail>
    </>
  );
};
