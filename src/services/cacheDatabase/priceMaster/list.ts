import { CacheDatabase } from '..';
import {
  AuthedUser,
  PriceMasterTablesEnum,
  UserTypeEnum,
  PriceMasterBuyerItem,
  PriceMasterSellerItem,
} from '@/constants';
import { reads } from '@/api/priceMaster/list';
import { toLowerCase } from '@/helpers/common';
import { PriceMasterUserType } from './index';

export class List extends CacheDatabase {
  async getPriceMasterList(): Promise<{
    [PriceMasterTablesEnum.priceMasterListBuyerItem]: PriceMasterBuyerItem[];
    [PriceMasterTablesEnum.priceMasterListSellerItem]: PriceMasterSellerItem[];
  }> {
    return {
      [PriceMasterTablesEnum.priceMasterListBuyerItem]: [
        ...await this.priceMasterListBuyerItem.
        toArray(),
      ],
      [PriceMasterTablesEnum.priceMasterListSellerItem]: [
        ...await this.priceMasterListSellerItem.
        toArray(),
      ],
    }
  }

  async updatePriceMasterList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: PriceMasterUserType[keyof PriceMasterUserType];
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
      await this.priceMasterListBuyerItem.clear();
      await this.priceMasterListBuyerItem.bulkAdd(response.priceMasterList || []);
    } else {
      await this.priceMasterListSellerItem.clear();
      await this.priceMasterListSellerItem.bulkAdd(response.priceMasterList || []);
    }
  }
}
