import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';
import { UserTypeEnum } from '@/constants';
import { readsDetailList } from '@/api/operations/detail';
import { toLowerCase } from '@/helpers/common';

export interface OperationsUserType {
  ownerProductionPlantBusinessPartner: string;
}

class OperationsCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }

  async getOperationsList() {
    return this.list.getOperationsList();
  }

  async getOperationsDetailList(
    operations: number,
    operationsItem: string,
  ) {
    return await this.detail.getOperationsDetailList(
      operations,
      operationsItem,
    );
  }

  async updateOperationsList(params: {
                               language: AuthedUser['language'];
                               businessPartner: AuthedUser['businessPartner'];
                               emailAddress: AuthedUser['emailAddress'];
                               userType: OperationsUserType[keyof OperationsUserType];
                             },
  ): Promise<void> {
    return await this.list.updateOperationsList(params);
  }

  async updateOperationsDetailList(
    params: {
      operations: number,
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: OperationsUserType[keyof OperationsUserType];
    },
  ): Promise<void> {
    return await this.detail.updateOperationsDetailList(params);
  }
}

export const operationsCache = new OperationsCache();

