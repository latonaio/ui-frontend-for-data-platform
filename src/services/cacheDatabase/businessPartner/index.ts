import { CacheDatabase } from '@/services/cacheDatabase';
import { List } from './list';
import { AuthedUser } from '@/constants';

export interface BusinessPartnerUserType {
  businessPartner: string;
}

class BusinessPartnerCache extends CacheDatabase implements List {
  private list: List;

  constructor() {
    super();
    this.list = new List();
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
}

export const businessPartnerCache = new BusinessPartnerCache();
