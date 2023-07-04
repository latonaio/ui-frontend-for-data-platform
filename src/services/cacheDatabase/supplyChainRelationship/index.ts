import { CacheDatabase } from '..';
import {
  AuthedUser,
  SupplyChainRelationshipDetailExconfList, SupplyChainRelationshipDetailExconfListHeader,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';
import {
	SupplyChainRelationshipTablesEnum,
  } from '@/constants';

export interface SupplyChainRelationshipUserType {
  buyer: string;
  seller: string;
}

class SupplyChainRelationshipCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
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

  async getSupplyChainRelationshipDetailExconfList(
    supplyChainRelationshipId: number,
    userType: SupplyChainRelationshipUserType[keyof SupplyChainRelationshipUserType],
  ): Promise<{
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]: SupplyChainRelationshipDetailExconfList | null;
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]: SupplyChainRelationshipDetailExconfListHeader | null;
  }> {
    return await this.detail.getSupplyChainRelationshipDetailExconfList(supplyChainRelationshipId, userType);
  }

  async updateSupplyChainRelationshipDetailExconfList(
    params: {
      supplyChainRelationshipId: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: SupplyChainRelationshipUserType[keyof SupplyChainRelationshipUserType];
    },
  ): Promise<void> {
    return await this.detail.updateSupplyChainRelationshipDetailExconfList(params);
  }
}

export const supplyChainRelationshipCache = new SupplyChainRelationshipCache();
