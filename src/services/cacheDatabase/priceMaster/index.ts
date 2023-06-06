import { CacheDatabase } from '..';
import {
  AuthedUser,
  PriceMasterItem,
} from '@/constants';
import { List } from './list';

export interface PriceMasterUserType {
  buyer: string;
  seller: string;
}

class PriceMasterCache extends CacheDatabase implements List {
  private list: List;

  constructor() {
    super();
    this.list = new List();
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
