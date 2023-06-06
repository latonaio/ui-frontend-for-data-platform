import { CacheDatabase } from '@/services/cacheDatabase';
import { ProductUserType } from './index';
import {
  AuthedUser,
  ProductDetailExconfList,
  ProductDetailExconfListHeader,
  ProductTablesEnum,
} from '@/constants';
import { reads } from '@/api/product/exconf';

export class Detail extends CacheDatabase {
  async getProductDetailExconfList(
    product: string,
    userType: ProductUserType[keyof ProductUserType],
  ): Promise<{
    [ProductTablesEnum.productDetailExconfList]: ProductDetailExconfList | null;
    [ProductTablesEnum.productDetailExconfListHeader]: ProductDetailExconfListHeader | null;
  }> {
    return {
      [ProductTablesEnum.productDetailExconfList]: await this.productDetailExconfList.get({ Product: product }) || null,
      [ProductTablesEnum.productDetailExconfListHeader]:
        await this.productDetailExconfListHeader.get({ Product: product }) || null,
    }
  }

  async updateProductDetailExconfList(
    params: {
      // isMarkedForDeletion: number;
      userType: ProductUserType[keyof ProductUserType];
      product: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await reads({
      userType: params.userType,
      product: params.product,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });
    await this.productDetailExconfList.clear();
    await this.productDetailExconfListHeader.clear();

    await this.productDetailExconfList.put(response.productDetailExconfList);
    await this.productDetailExconfListHeader.put(response.productDetailExconfListHeader);
  }
}
