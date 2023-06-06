import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';
// import { Detail } from './detail';

export interface OperationsUserType {
  ownerBusinessPartnerItem: string;
}

class OperationsCache extends CacheDatabase implements List {
  private list: List;

  constructor() {
    super();
    this.list = new List();
  }

  async getOperationsList() {
    return this.list.getOperationsList();
  }

  async updateOperationsList(params: {
    language: AuthedUser['language'];
    businessPartner: AuthedUser['businessPartner'];
    emailAddress: AuthedUser['emailAddress'];
    userType: OperationsUserType[keyof OperationsUserType];
  }): Promise<void> {
    return await this.list.updateOperationsList({
      language: params.language,
      businessPartner: params.businessPartner,
      emailAddress: params.emailAddress,
      userType: params.userType,
    });
  }
}

export const operationsCache = new OperationsCache();

