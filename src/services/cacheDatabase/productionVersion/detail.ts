import { CacheDatabase } from '@/services/cacheDatabase';
import { ProductionVersionUserType } from './index';
import {
  AuthedUser,
  ProductionVersionDetailListItem,
  ProductionVersionDetailListHeader,
  ProductionVersionTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { productInfoReduce, toLowerCase } from '@/helpers/common';
import { readsDetailList } from '@/api/productionVersion/detail';

export class Detail extends CacheDatabase {
  async getProductionVersionDetailList(
    productionVersion: number,
    userType: ProductionVersionUserType[keyof ProductionVersionUserType],
  ): Promise<{
    [ProductionVersionTablesEnum.productionVersionDetailList]:
	ProductionVersionDetailListItem[];
    [ProductionVersionTablesEnum.productionVersionDetailListHeader]:
	ProductionVersionDetailListHeader | undefined;
  }> {
    if (userType === toLowerCase(UserTypeEnum.OwnerBusinessPartner)) {
      return {
        [ProductionVersionTablesEnum.productionVersionDetailList]:
          await this.productionVersionDetailListOwnerBusinessPartnerItem
            .toArray(),
        [ProductionVersionTablesEnum.productionVersionDetailListHeader]:
          await this.productionVersionDetailListHeader.get({ ProductionVersion: productionVersion }),
      };
    }

    return {
      [ProductionVersionTablesEnum.productionVersionDetailList]:
        await this.productionVersionDetailListOwnerBusinessPartnerItem
          .toArray(),
      [ProductionVersionTablesEnum.productionVersionDetailListHeader]:
        await this.productionVersionDetailListHeader.get({ ProductionVersion: productionVersion }),
    };
  }


  async updateProductionVersionDetailList(
    params: {
	  productionVersion: number;
      userType: ProductionVersionUserType[keyof ProductionVersionUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsDetailList({
      // isCancelled: false,
      productionVersion: params.productionVersion,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    if (response.numberOfRecords > 0) {
      for (const productionVersionDetailListItem of response.productionVersionDetailList) {
        if (params.userType === toLowerCase(UserTypeEnum.OwnerBusinessPartner)) {

          console.log(this.productionVersionDetailListOwnerBusinessPartnerItem)

          await this.productionVersionDetailListOwnerBusinessPartnerItem.put({
            ...productionVersionDetailListItem,
            ProductionVersion: params.productionVersion,
          });
        } else {
        }
      }

      await this.productionVersionDetailListHeader.put({
        ...response.productionVersionDetailListHeader,
        ProductionVersion: params.productionVersion,
      });
    } else {
      if (params.userType === toLowerCase(UserTypeEnum.OwnerBusinessPartner)) {
        await this.productionVersionDetailListOwnerBusinessPartnerItem.clear();
      }

      await this.productionVersionDetailListHeader.clear();
    }
  }
}
