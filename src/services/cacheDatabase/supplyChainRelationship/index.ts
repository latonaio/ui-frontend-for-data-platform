import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';

export interface SupplyChainRelationshipUserType {
  buyer: string;
  seller: string;
}

class SupplyChainRelationshipCache extends CacheDatabase implements List {
  private list: List;

  constructor() {
    super();
    this.list = new List();
  }

  async getSupplyChainRelationshipList() {
    return this.list.getSupplyChainRelationshipList();
  }

  async updateSupplyChainRelationshipList(
    params:
      {
        language: AuthedUser['language'];
        businessPartner: AuthedUser['businessPartner'];
        emailAddress: AuthedUser['emailAddress'];
        userType: SupplyChainRelationshipUserType[keyof SupplyChainRelationshipUserType];
      }
  ): Promise<void> {
    return await this.list.updateSupplyChainRelationshipList(params);
  }
}

export const supplyChainRelationshipCache = new SupplyChainRelationshipCache();
