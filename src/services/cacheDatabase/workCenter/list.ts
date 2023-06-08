import { CacheDatabase } from '..';
import {
  AuthedUser,
  WorkCenterTablesEnum,
  UserTypeEnum,
  WorkCenterItem,
} from '@/constants';
import { reads } from '@/api/workCenter/list';
import { toLowerCase } from '@/helpers/common';
import { WorkCenterUserType } from './index';

export class List extends CacheDatabase {
  async getWorkCenterList(): Promise<{
    [WorkCenterTablesEnum.workCenterListBusinessPartnerItem]: WorkCenterItem[];
  }> {
    return {
      [WorkCenterTablesEnum.workCenterListBusinessPartnerItem]: [
        ...await this.workCenterListBusinessPartnerItem
          .toArray(),
      ],
    }
  }

  async updateWorkCenterList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: WorkCenterUserType[keyof WorkCenterUserType];
    },
  ): Promise<void> {
    const response = await reads({
      // isCancelled: false,
      isMarkedForDeletion: false,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    })

    if (params.userType === toLowerCase(UserTypeEnum.Buyer)) {
      await this.workCenterListBusinessPartnerItem.clear();
      await this.workCenterListBusinessPartnerItem.bulkAdd(response.workCenterList || []);
    } else {
      await this.workCenterListBusinessPartnerItem.clear();
      await this.workCenterListBusinessPartnerItem.bulkAdd(response.workCenterList || []);
    }
  }
}
