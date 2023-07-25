import { clsx } from 'clsx';
import {
  Column,
  OrderInfo,
  ProductDetail,
  ProductDetailTop,
  ProductDetailInternalCapacityListTable,
} from './Detail.style';
import { Detail } from '@/components/Content/Detail/Detail';
import {
  BusinessPartnerTablesEnum,
} from '@/constants';
// import { BusinessPartnerContentListItem } from '@/constants';
import { ProductImageLabel } from '@/components/Label';
import { rem } from 'polished';
import { DisplayData } from '@/pages/business-partner/detail/[userType]/[content]/[businessPartner]';
import {
  ExConfsHeader,
  ExConfsHeaderInfo, ExConfsHeaderInfoTop,
  ExConfsHeaderWrapper
} from '@/components/Content/Detail/ProductDetailExconfList.style';

interface BasicInfoElement {
  [key: string]: any;
}

interface BusinessPartnerDetailTopElement {
  [key: string]: any;
}

interface BusinessPartnerDetailBottomElement {
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
    </>
  )
}

const BusinessPartnerDetailTopElement = ({
                                   params,
                                   content,
                                 }: Partial<BusinessPartnerDetailTopElement>) => {
  return (
    <>
      <ProductDetailTop className={'mb-4'}>
        {content === 'General' && (
		 <div>
			<div
              className={'flex justify-start items-center'}
              style={{
                marginLeft: rem(10),
                marginBottom: rem(26),
              }}
            >
            </div>
            <div>
              <ProductDetailInternalCapacityListTable>
                <li>
                    <div className={'w-2/4'}>ビジネスパートナフル名称: {params.BusinessPartnerFullName}</div>
                </li>
                <li>
                    <div className={'w-2/4'}>産業: {params.Industry}</div>
                </li>
                <li>
                    <div className={'w-2/4'}>法的登録番号: {params.LegalEntityRegistration}</div>
                </li>
                <li>
                    <div className={'w-2/4'}>国: {params.Country}</div>
                </li>
                <li>
                    <div className={'w-2/4'}>言語: {params.Language}</div>
                </li>
                <li>
                    <div className={'w-2/4'}>通貨: {params.Currency}</div>
                </li>
                <li>
                    <div className={'w-2/4'}>住所ID: {params.AddressID}</div>

                </li>
              </ProductDetailInternalCapacityListTable>
            </div>
          </div>
        )}
        {/* BP */}
        {content === 'Address' && (
          <div>
            <div
              className={'flex justify-start items-center'}
              style={{
                marginLeft: rem(10),
                marginBottom: rem(26),
              }}
            >
            </div>
            <div>
              <ProductDetailInternalCapacityListTable>
			  <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>郵便番号: {params.PostalCode}</div>
                  <div className={'w-2/4'}>ローカルサブ地域: {params.LocalSubRegion}</div>
                </div>
              </li>
			  <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>市区町村: {params.CityName}</div>
                  <div className={'w-2/4'}>ローカル地域: {params.LocalRegion}</div>
                </div>
              </li>
			  <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>地名番地: {params.StreetName}</div>
                  <div className={'w-2/4'}>国: {params.Country}</div>
                </div>
              </li>
			  <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>建物名: {params.Building}</div>
                  <div className={'w-2/4'}>グローバル地域: {params.GlobalRegion}</div>
                </div>
              </li>
			  <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>階数: {params.Floor}</div>
                  <div className={'w-2/4'}>ディストリクト: {params.District}</div>
                </div>
              </li>
			  <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>部屋: {params.Room}</div>
                  <div className={'w-2/4'}>有効開始日付: {params.ValidityStartDate}</div>
                </div>
              </li>
			  <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}>タイムゾーン: {params.TimeZone}</div>
                  <div className={'w-2/4'}>有効終了日付: {params.ValidityEndDate}</div>
                </div>
              </li>
			  <li>
                <div className={'flex justify-start items-center'}>
                  <div className={'w-2/4'}></div>
                  <div className={'w-2/4'}>削除フラグ: {params.ItemCategory}</div>
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
const BusinessPartnerDetailBottomElement = ({}: Partial<BusinessPartnerDetailBottomElement>) => {
  return (
    <div>
    </div>
  )
}

export const BusinessPartnerDetailContent = ({
                                       data,
                                       className,
}: {
  data: DisplayData;
  className?: string;
}) => {
  const contentDisplayData = {
    params: data &&
      data[BusinessPartnerTablesEnum.businessPartnerDetailExconfList]
        ?.Existences.find(
          (item) => item.Content === data.content)
        ?.Param[0],
  }

  const businessPartnerDetailExconfListHeader = data && data[BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader];

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
              <ExConfsHeaderInfoTop>ビジネスパートナコード: {businessPartnerDetailExconfListHeader?.BusinessPartner}</ExConfsHeaderInfoTop>
            </ExConfsHeaderInfo>
            <ExConfsHeaderInfo>
              <ExConfsHeaderInfoTop>ビジネスパートナ名: {businessPartnerDetailExconfListHeader?.BusinessPartnerName}</ExConfsHeaderInfoTop>
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
          />
        </Column>
        <Column className={'Column2'}>
          <ProductDetail>
            <BusinessPartnerDetailTopElement
              params={contentDisplayData.params}
              content={data && data.content}
            />
            <BusinessPartnerDetailBottomElement
            />
          </ProductDetail>
        </Column>
      </Detail>
    </>
  );
};
