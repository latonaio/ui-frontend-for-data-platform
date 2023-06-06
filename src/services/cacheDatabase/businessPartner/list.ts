import { CacheDatabase } from '@/services/cacheDatabase';
import {
  AuthedUser,
  BusinessPartnerItem,
  BusinessPartnerTablesEnum,
} from '@/constants';
import { BusinessPartnerUserType } from './index';
import { reads } from '@/api/businessPartner/list';

export class List extends CacheDatabase {
  async getBusinessPartnerList(): Promise<
    {
      [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: BusinessPartnerItem[];
    }> {
    return {
      [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: [
        ...await this.businessPartnerListBusinessPartnerItem
          .toArray()
      ],
    }
  }

  async updateBusinessPartnerList (
    params: {
      userType: BusinessPartnerUserType[keyof BusinessPartnerUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await reads({
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
      // isMarkedForDeletion: false,
    });

    await this.businessPartnerListBusinessPartnerItem.clear();
    await this.businessPartnerListBusinessPartnerItem.bulkAdd(response.BusinessPartners || []);
  }
}
