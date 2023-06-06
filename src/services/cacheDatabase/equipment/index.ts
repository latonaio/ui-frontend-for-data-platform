import { CacheDatabase } from '..';
import {
  AuthedUser,
  EquipmentTablesEnum,
} from '@/constants';
import { List } from './list';

export interface EquipmentUserType {
  businessPartner: string;
}

class EquipmentCache extends CacheDatabase implements List {
  private list: List;

  constructor() {
    super();
    this.list = new List();
  }

  async getEquipmentList() {
    return this.list.getEquipmentList();
  }

  async updateEquipmentList(params: {
    language: AuthedUser['language'];
    businessPartner: AuthedUser['businessPartner'];
    emailAddress: AuthedUser['emailAddress'];
    userType: EquipmentUserType[keyof EquipmentUserType];
  }): Promise<void> {
    return await this.list.updateEquipmentList({
      language: params.language,
      businessPartner: params.businessPartner,
      emailAddress: params.emailAddress,
      userType: params.userType,
    });
  }
}

export const equipmentCache = new EquipmentCache();

