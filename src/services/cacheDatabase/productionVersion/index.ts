import { CacheDatabase } from '..';
import {
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';
import { toLowerCase } from '@/helpers/common';

export interface ProductionVersionUserType {
	OwnerBusinessPartner: string;
}

class ProductionVersionCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }

  async getProductionVersionList() {
    return this.list.getProductionVersionList();
  }

  async getProductionVersionDetailList(
    productionVersion: number,
    userType: string,
  ) {
    return await this.detail.getProductionVersionDetailList(
      productionVersion,
      userType,
    );
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

  async updateProductionVersionDetailList(
    params: {
      productionVersion: number;
      userType: ProductionVersionUserType[keyof ProductionVersionUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.detail.updateProductionVersionDetailList(params);
  }
}

export const productionVersionCache = new ProductionVersionCache();

