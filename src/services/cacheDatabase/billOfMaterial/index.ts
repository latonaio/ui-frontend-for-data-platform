import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';

export interface BillOfMaterialUserType {
  ownerBusinessPartner: string;
}

class BillOfMaterialCache extends CacheDatabase implements List {
  private list: List;

  constructor() {
    super();
    this.list = new List();
  }

  async getBillOfMaterialList() {
    return this.list.getBillOfMaterialList();
  }

  async updateBillOfMaterialList(params: {
    language: AuthedUser['language'];
    businessPartner: AuthedUser['businessPartner'];
    emailAddress: AuthedUser['emailAddress'];
    userType: BillOfMaterialUserType[keyof BillOfMaterialUserType];
  }): Promise<void> {
    return await this.list.updateBillOfMaterialList({
      language: params.language,
      businessPartner: params.businessPartner,
      emailAddress: params.emailAddress,
      userType: params.userType,
    });
  }
}

export const billOfMaterialCache = new BillOfMaterialCache();

