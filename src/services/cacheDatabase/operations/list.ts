import { CacheDatabase } from '..';
import {
  OperationsTablesEnum,
  OperationsItem,
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { reads } from '@/api/operations/list';
import { toLowerCase } from '@/helpers/common';
import { OperationsUserType } from './index';

export class List extends CacheDatabase {
  async getOperationsList(): Promise<
    {
      [OperationsTablesEnum.operationsListOwnerBusinessPartnerItem]: OperationsItem[];
    }> {
    return {
      [OperationsTablesEnum.operationsListOwnerBusinessPartnerItem]: [
        ...await this.operationsListOwnerBusinessPartnerItem
          .toArray(),
      ]
    }
  }

  async updateOperationsList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: OperationsUserType[keyof OperationsUserType];
    },
  ): Promise<void> {
    const response = await reads({
      // isMarkedForDeletion: false,
      userType: params.userType,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    })

    if (params.userType === toLowerCase(UserTypeEnum.OwnerBusinessPartner)) {
      await this.operationsListOwnerBusinessPartnerItem.clear();
      await this.operationsListOwnerBusinessPartnerItem.bulkAdd(response.operationsList || []);
    }
  }
}
