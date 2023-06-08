import { CacheDatabase } from '..';
import {
  AuthedUser,
  SupplyChainRelationshipTablesEnum,
  UserTypeEnum,
  SupplyChainRelationshipBuyerItem,
  SupplyChainRelationshipSellerItem,
} from '@/constants';
import { reads } from '@/api/supplyChainRelationship/list';
import { toLowerCase } from '@/helpers/common';
import { SupplyChainRelationshipUserType } from './index';

export class List extends CacheDatabase {
  async getSupplyChainRelationshipList(): Promise<{
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: SupplyChainRelationshipBuyerItem[];
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: SupplyChainRelationshipSellerItem[];
  }> {
    return {
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: [
        ...await this.supplyChainRelationshipListBuyerItem.
        toArray(),
      ],
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: [
        ...await this.supplyChainRelationshipListSellerItem.
        toArray(),
      ],
    }
  }

  async updateSupplyChainRelationshipList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: SupplyChainRelationshipUserType[keyof SupplyChainRelationshipUserType];
    },
  ): Promise<void> {
    const response = await reads({
      headerCompleteDeliveryIsDefined: false,
      headerDeliveryBlockStatus: false,
      // isCancelled: false,
      // isMarkedForDeletion: false,
      headerDeliveryStatus: 'NP',
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    })

    if (params.userType === toLowerCase(UserTypeEnum.Buyer)) {
      await this.supplyChainRelationshipListBuyerItem.clear();
      await this.supplyChainRelationshipListBuyerItem.bulkAdd(response.supplyChainRelationshipList || []);
    } else {
      await this.supplyChainRelationshipListSellerItem.clear();
      await this.supplyChainRelationshipListSellerItem.bulkAdd(response.supplyChainRelationshipList || []);
    }
  }
}
