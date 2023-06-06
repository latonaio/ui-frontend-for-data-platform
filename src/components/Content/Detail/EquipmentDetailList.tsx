import { clsx } from 'clsx';
import React from 'react';
import {
  EquipmentDetail,
  EquipmentDetailContent,
  EquipmentDetailContentList,
  EquipmentDetailContentListLi,
  EquipmentDetailHeader,
  EquipmentDetailHeaderWrapper,
  EquipmentDetailHeaderInfo,
  EquipmentDetailHeaderInfoTop,
  EquipmentDetailHeaderInfoBottom,
  EquipmentDetailHeaderImage,
  EquipmentDetailitemHeader,
  EquipmentDetailitemHeaderImage,
  EquipmentDetailitemHeaderInfo, EquipmentDetailitemHeaderInfoBottom, EquipmentDetailitemHeaderInfoTop,
  EquipmentDetailitemHeaderWrapper,
  DetailLabel,
  DetailContent
} from './EquipmentDetailList.style';
// import { DisplayData } from '@/pages/equipment/detail/[equipment]/[userType]/[product]';
import { EquipmentTablesEnum, UserTypeEnum } from '@/constants';
import { generateImageProductUrl, toLowerCase } from '@/helpers/common';
import { clickHandler } from '@/components/Content/List/List';
import { Label, ProductImageLabel } from '@/components/Label';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import { Detail } from '@/components/Content/Detail/Detail';

interface BasicInfoElement {
  [key: string]: any;
}

interface ProductDetailTopElement {
  [key: string]: any;
}

interface ProductDetailBottomElement {
}

const ProductDetailBottomElement = ({}: Partial<ProductDetailBottomElement>) => {
  return (
    <div>
    </div>
  )
}

// const BasicInfoElement = (data: Partial<BasicInfoElement>) => {
//   return (
//     <>
//       <EquipmentInfo>
//         <ProductImageLabel
//           style={{
//             marginTop: rem(3),
//             marginBottom: rem(20),
//           }}
//         >
//           {data.content}
//         </ProductImageLabel>
//       </EquipmentInfo>
//       <div>
//         <img
//           src={data.productImage &&
//             generateImageProductUrl(
//               data.productImage.BusinessPartnerID ?
//                 data.productImage.BusinessPartnerID.toString() :
//                 null,
//               data.productImage
//             )}
//           alt={`${data.productName}`}
//         />
//       </div>
//     </>
//   )
// }

export const EquipmentDetailList = (
) => {
  // const equipmentListBusinessPartnerItem = data && data[EquipmentTablesEnum.equipmentListBusinessPartnerItem];

  return (
    <EquipmentDetail>
      <EquipmentDetailHeader>
        <EquipmentDetailHeaderWrapper
          className={'flex justify-start items-center'}
        >
          <EquipmentDetailHeaderImage>
            <img
              width={100}
            />
          </EquipmentDetailHeaderImage>
          <div
            className={'flex justify-start items-center'}
          >
            <EquipmentDetailHeaderInfo>
              <EquipmentDetailHeaderInfoTop>設備: テキスト</EquipmentDetailHeaderInfoTop>
              <EquipmentDetailHeaderInfoBottom>保全プラント: テキスト</EquipmentDetailHeaderInfoBottom>
            </EquipmentDetailHeaderInfo>
            <EquipmentDetailHeaderInfo>
              <EquipmentDetailHeaderInfoTop>設備名: テキスト</EquipmentDetailHeaderInfoTop>
              <EquipmentDetailHeaderInfoBottom>有効開始日付: テキスト</EquipmentDetailHeaderInfoBottom>
            </EquipmentDetailHeaderInfo>
            <EquipmentDetailHeaderInfo>
              <EquipmentDetailHeaderInfoTop>設備タイプ名: テキスト</EquipmentDetailHeaderInfoTop>
            </EquipmentDetailHeaderInfo>
          </div>
        </EquipmentDetailHeaderWrapper>
      </EquipmentDetailHeader>
      <Detail className={clsx(
        `ContainerWrapper relative`,
      )}
        // prevPage={prevPagePath()}
        // nextPage={nextPagePath()}
      >
        <DetailLabel>
          <Label>test</Label>
          <Label>test</Label>
          <Label>test</Label>
        </DetailLabel>
        <DetailContent>
          <div>
            <img></img>
          </div>
          <div>
            <ul>
              <li>設備カテゴリ : </li>
              <li>技術対象タイプ : </li>
              <li>総重量 : 1511.00</li>
              <li>正味重量 : 1441.00</li>
              <li>重量単位 : G</li>
              <li>サイズ寸法 : 15.4 x 12.1 x 4.4</li>
              <li>OP開始日/時 : 2023-04-01</li>
              <li>OP終了日/時 : 2026-03-31</li>
            </ul>
          </div>

          <div>
            <ul>
              <li>取得日付 : 2023-03-22</li>
              <li>製造者 : NVIDIA</li>
              <li>製造国 : TW</li>
              <li>製造番号 : 1834911AAW</li>
              <li>資産番号 : 1122233</li>
              <li>資産補助番号 : 1</li>
              <li>有効終了日付 : 9999/12/31</li>
              <li>削除フラグ : false</li>
            </ul>
          </div>
        </DetailContent>
      </Detail>
    </EquipmentDetail>
  );
};
