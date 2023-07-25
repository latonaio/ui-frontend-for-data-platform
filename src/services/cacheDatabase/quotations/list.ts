import { CacheDatabase } from '..';
import {
  AuthedUser,
  QuotationsTablesEnum,
  UserTypeEnum,
  QuotationsBuyerItem,
  QuotationsSellerItem,
} from '@/constants';
import { reads } from '@/api/quotations/list';
import { toLowerCase } from '@/helpers/common';
import { QuotationsUserType } from './index';

export class List extends CacheDatabase {
  async getQuotationsList(): Promise<{
    [QuotationsTablesEnum.quotationsListBuyerItem]: QuotationsBuyerItem[];
    [QuotationsTablesEnum.quotationsListSellerItem]: QuotationsSellerItem[];
  }> {
    return {
      [QuotationsTablesEnum.quotationsListBuyerItem]: [
        ...await this.quotationsListBuyerItem.
        toArray(),
      ],
      [QuotationsTablesEnum.quotationsListSellerItem]: [
        ...await this.quotationsListSellerItem.
        toArray(),
      ],
    }
  }

  async updateQuotationsList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: QuotationsUserType[keyof QuotationsUserType];
    },
  ): Promise<void> {
    const response = await reads({
      // isMarkedForDeletion: false,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    })

    if (params.userType === toLowerCase(UserTypeEnum.Buyer)) {
      await this.quotationsListBuyerItem.clear();
      await this.quotationsListBuyerItem.bulkAdd(response.Header || []);
    } else {
      await this.quotationsListSellerItem.clear();
      await this.quotationsListSellerItem.bulkAdd(response.Header || []);
    }
  }
}
