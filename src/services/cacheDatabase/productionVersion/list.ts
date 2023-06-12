import { CacheDatabase } from '..';
import {
  ProductionVersionTablesEnum,
  ProductionVersionListItem,
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { reads } from '@/api/productionVersion/list';
import { toLowerCase } from '@/helpers/common';
import { ProductionVersionUserType } from './index';

export class List extends CacheDatabase {
  async getProductionVersionList(): Promise<
    {
      [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]: ProductionVersionListItem[];
    }> {
    return {
      [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]: [
        ...await this.productionVersionListOwnerBusinessPartnerItem
          .toArray(),
      ]
    }
  }

  async updateProductionVersionList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: ProductionVersionUserType[keyof ProductionVersionUserType];
    },
  ): Promise<void> {
    const response = await reads({
      headerIsMarkedForDeletion: false,
      userType: params.userType,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    })

    if (params.userType === toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)) {
      await this.productionVersionListOwnerBusinessPartnerItem.clear();
      await this.productionVersionListOwnerBusinessPartnerItem.bulkAdd(response.productionVersionList || []);
    }
  }
}
