import { CacheDatabase } from '..';
import {
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { List } from './list';
import { toLowerCase } from '@/helpers/common';

export interface ProductionVersionUserType {
  ownerProductionPlantBusinessPartner: string;
}

class ProductionVersionCache extends CacheDatabase implements List {
  private list: List;

  constructor() {
    super();
    this.list = new List();
  }

  async getProductionVersionList() {
    return this.list.getProductionVersionList();
  }

  async updateProductionVersionList(
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: ProductionVersionUserType[keyof ProductionVersionUserType];
    },
  ): Promise<void> {
    return await this.list.updateProductionVersionList(params);
  }

  // async updateProductionVersionDetailList(
  //   params: {
  //     productionVersion: number;
  //     userType: ProductionVersionUserType[keyof ProductionVersionUserType],
  //     language: AuthedUser['language'];
  //     businessPartner: AuthedUser['businessPartner'];
  //     emailAddress: AuthedUser['emailAddress'];
  //   },
  // ): Promise<void> {
  //   return await this.detail.updateProductionVersionDetailList(params);
  // }
}

export const productionVersionCache = new ProductionVersionCache();

