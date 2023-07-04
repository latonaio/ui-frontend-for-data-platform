import { CacheDatabase } from '..';
import {
  AuthedUser,
  PriceMasterItem,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';
import { BillOfMaterialUserType } from '@/services/cacheDatabase/billOfMaterial';

export interface PriceMasterUserType {
  buyer: string;
  seller: string;
}

class PriceMasterCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }

  async getPriceMasterDetailList(
    supplyChainRelationshipID: number,
    userType: PriceMasterUserType[keyof PriceMasterUserType],
  ) {
    return await this.detail.getPriceMasterDetailList(supplyChainRelationshipID, userType);
  }

  async updatePriceMasterDetailList(
    params: {
      supplyChainRelationshipId: number;
      userType: PriceMasterUserType[keyof PriceMasterUserType];
      language: string;
      businessPartner: number;
      emailAddress: string;
    }): Promise<void> {
    return await this.detail.updatePriceMasterDetailList(params);
  }

  async getPriceMasterList() {
    return this.list.getPriceMasterList();
  }

  async updatePriceMasterList(
    params:
      {
        language: AuthedUser['language'];
        businessPartner: AuthedUser['businessPartner'];
        emailAddress: AuthedUser['emailAddress'];
        userType: PriceMasterUserType[keyof PriceMasterUserType];
      }
  ): Promise<void> {
    return await this.list.updatePriceMasterList(params);
  }
}

export const priceMasterCache = new PriceMasterCache();
