import { CacheDatabase } from '..';
import {
  ProductionOrderTablesEnum,
  ProductionOrderItem, AuthedUser, UserTypeEnum,
} from '@/constants';
import { reads } from '@/api/productionOrder/list';
import { toLowerCase } from '@/helpers/common';
import { ProductionOrderUserType } from './index';

export class List extends CacheDatabase {
  async getProductionOrderList(): Promise<
    {
      [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]: ProductionOrderItem[];
    }> {
    return {
      [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]: [
        ...await this.productionOrderListOwnerProductionPlantBusinessPartnerItem
          .orderBy('ProductionOrder')
          .reverse()
          .toArray(),
      ]
    }
  }

  async updateProductionOrderList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: ProductionOrderUserType[keyof ProductionOrderUserType];
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
      await this.productionOrderListOwnerProductionPlantBusinessPartnerItem.clear();
      await this.productionOrderListOwnerProductionPlantBusinessPartnerItem.bulkAdd(response.productionOrderList || []);
    }
  }
}
