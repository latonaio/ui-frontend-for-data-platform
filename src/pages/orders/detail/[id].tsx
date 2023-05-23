import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { readProduct } from '@/api/productMaster';
import { readProductGroup } from '@/api/productGroup';

import UnauthorizedError from '@/errors/Unauthorized';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AuthState } from '@/store/authSlice';
import { Detail } from '@/components/Content';
import { getCookieFromServer, getCookie, getLocalStorage } from '@/helpers/common';
import { priceUnitQty } from '@/helpers/converter';
import { useRouter } from 'next/router';
import { AuthedUser } from '@/constants';
import { readBusinessPartnerGeneral } from '@/api/businessPartnerGeneral';

const OrdersDetail: React.FC = (data: any) => {
  const [displayData, setDisplayData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const {
      language,
      businessPartner,
    }: AuthedUser = getLocalStorage('auth');

    try {
      const fetch = async () => {
        const Product = await readProduct({
          Product: {
            Product: data.productCode,
            ProductDescriptionByBusinessPartner: {
              BusinessPartner: businessPartner,
              Language: language
            },
          },
          accepter: [
            'General',
            'ProductDescriptionByBusinessPartner',
          ],
        });

        const ProductGroup = await readProductGroup({
          ProductGroup: {
            ProductGroup: Product.General.ProductGroup,
            ProductGroupText :{
              Language: language,
              ProductGroupName: '',
            }
          },
          accepter: [
            'ProductGroup',
            'ProductGroupText'
          ],
        });

        const BPPlant = await readProduct({
          Product: {
            Product: data.productCode,
            BusinessPartner: {
              BusinessPartner: businessPartner,
            },
          },
          accepter: [
            'BPPlant',
          ],
        });

        const Accounting = await readProduct({
          Product: {
            Product: data.productCode,
            BusinessPartner: {
              BusinessPartner: businessPartner,
              BPPlant: {
                Plant: BPPlant.BPPlant.Plant,
              }
            },
          },
          accepter: [
            'Accounting'
          ],
        });

        const BusinessPartnerGeneral = await readBusinessPartnerGeneral({
          BusinessPartnerGeneral: {
            BusinessPartner: businessPartner,
            Language: language,
          },
          accepter: [
            'General'
          ],
        });
        
        const displayData = {
          ...data,
          name: Product.ProductDescriptionByBusinessPartner.ProductDescription,
          productCode: Product.ProductDescriptionByBusinessPartner.Product,
          productInfo: [
            { key: '名称', value: ProductGroup.ProductGroupText?.ProductGroupName },
            { key: '価格単位', value: priceUnitQty(Accounting.Accounting?.PriceUnitQty) },
            { key: '製造者', value: BusinessPartnerGeneral.General.BusinessPartnerName },
          ],
        };

        setDisplayData(displayData);
      };
      fetch();
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        router.push('/login');
      }
    }
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'データ連携基盤 オーダー詳細'} className={'text-2xl'} />
      <Main className={'Main'}>
        <ContentsTop className={'ContentsTopNav'} />
        {displayData && <Detail data={displayData} />}
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const { id } = context.query;
  const productCode = id;

  const accessToken = getCookieFromServer('accessToken', context.req);

  // const params = {
  //   "Product": {
  //     "Product": "A3750",
  //     "ProductDescriptionByBusinessPartner": {
  //       "BusinessPartner": 201,
  //       "Language": "JA"
  //     }
  //   },
  //   "accepter": ["General", "ProductDescriptionByBusinessPartner"],
  // };
  let res = {};

  // console.log('try ssr')

  // try {
  //   res = await getProduct(params, accessToken)
  // } catch (e) {
  //   if (e instanceof UnauthorizedError) {
  //     console.log('UnauthorizedError');
  //     return {
  //       redirect: {
  //         destination: "/login",
  //         permanent: false,
  //       },
  //     };
  //   }
  // }

  return {
    props: {
      name: 'ランチパック たまご',
      orderNumber: '35771',
      serialNumber: '1',
      productCode,
      tags: [
        '山崎製パン',
        'サンドイッチ',
        'たまご',
        'ロングセラー',
        'ランチパック',
      ],
      allergen: [
        { name: '乳', checked: true },
        { name: '卵', checked: true },
        { name: '小麦', checked: true },
        { name: 'そば', checked: false },
        { name: '落花生', checked: false },
        { name: 'えび', checked: false },
        { name: 'かに', checked: false },
      ],
      productInfo: [
        { key: '名称', value: '菓子パン' },
        { key: '内容量', value: '2個' },
        { key: '原材料', value: '小麦粉/ピーナッツクリーム/砂糖混合異性化液糖/マーガリン/パン酵母/食塩/脱脂粉乳/乳化剤/酢酸Na/香辛/イーストフード/V.C/（一部に乳成分・小麦・落花生・アーモンド・大豆を含む）' },
        { key: '価格', value: '本体価格 138円 （税込149円）' },
        { key: '製造者', value: '山崎製パン株式会社' },
      ],
      // params,
    }
  }
}

export default OrdersDetail;
