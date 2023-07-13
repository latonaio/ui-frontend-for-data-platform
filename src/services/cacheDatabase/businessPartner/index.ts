import { CacheDatabase } from '@/services/cacheDatabase';
import { List } from './list';
import { Detail } from './detail';
import { AuthedUser } from '@/constants';
import {
    BusinessPartnerTablesEnum,
    BusinessPartnerDetailExconfList,
    BusinessPartnerDetailExconfListHeader, ProductTablesEnum,
  } from '@/constants';

export interface BusinessPartnerUserType {
  businessPartner: string;
}

class BusinessPartnerCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }

  async getBusinessPartnerList() {
    return this.list.getBusinessPartnerList();
  }

  async updateBusinessPartnerList(
    params: {
      userType: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.list.updateBusinessPartnerList(params);
  }

  async getBusinessPartnerDetailExconfList(
    businessPartner: number,
    userType: BusinessPartnerUserType[keyof BusinessPartnerUserType],
  ): Promise<{
    [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]: BusinessPartnerDetailExconfList | null;
    [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]: BusinessPartnerDetailExconfListHeader | null;
  }> {
    return await this.detail.getBusinessPartnerDetailExconfList(businessPartner, userType);
  }

  async updateBusinessPartnerDetailExconfList(
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: BusinessPartnerUserType[keyof BusinessPartnerUserType];
    },
  ): Promise<void> {
    return await this.detail.updateBusinessPartnerDetailExconfList(params);
  }

}

export const businessPartnerCache = new BusinessPartnerCache();
