import { CacheDatabase } from '..';
import {
  ProductTablesEnum,
  ProductItem,
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { reads } from '@/api/product/list';
import { toLowerCase } from '@/helpers/common';
import { ProductUserType } from './index';

export class List extends CacheDatabase {
  async getProductList(): Promise<
    {
      [ProductTablesEnum.productListBusinessPartnerItem]: ProductItem[];
    }> {
    return {
      [ProductTablesEnum.productListBusinessPartnerItem]: [
        ...await this.productListBusinessPartnerItem
          .orderBy('Product')
          .reverse()
          .toArray(),
      ]
    }
  }

  async updateProductList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: ProductUserType[keyof ProductUserType];
    },
  ): Promise<void> {
    const response = await reads({
      // isMarkedForDeletion: false,
      userType: params.userType,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    })

    if (params.userType === toLowerCase(UserTypeEnum.BusinessPartner)) {
      await this.productListBusinessPartnerItem.clear();
      await this.productListBusinessPartnerItem.bulkAdd(response.productList || []);
    }
  }
}
