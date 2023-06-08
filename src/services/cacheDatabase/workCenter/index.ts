import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';

export interface WorkCenterUserType {
  buyer: string;
  seller: string;
}

class WorkCenterCache extends CacheDatabase implements List {
  private list: List;

  constructor() {
    super();
    this.list = new List();
  }

  async getWorkCenterList() {
    return this.list.getWorkCenterList();
  }

  async updateWorkCenterList(
    params:
      {
        language: AuthedUser['language'];
        businessPartner: AuthedUser['businessPartner'];
        emailAddress: AuthedUser['emailAddress'];
        userType: WorkCenterUserType[keyof WorkCenterUserType];
      }
  ): Promise<void> {
    return await this.list.updateWorkCenterList(params);
  }
}

export const workCenterCache = new WorkCenterCache();
