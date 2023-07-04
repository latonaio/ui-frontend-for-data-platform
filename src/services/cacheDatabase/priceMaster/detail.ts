import { CacheDatabase } from '..';
import {
  AuthedUser,
  PriceMasterTablesEnum,
  PriceMasterDetailListItem,
  PriceMasterDetailHeader,
} from '@/constants';
import { readsDetailList } from '@/api/priceMaster/detail';
import { PriceMasterUserType } from '.';

export class Detail extends CacheDatabase {
  async getPriceMasterDetailList(
    supplyChainRelationshipIs: number,
    userType: PriceMasterUserType[keyof PriceMasterUserType],
  ): Promise<{
    [PriceMasterTablesEnum.priceMasterDetailListItem]: PriceMasterDetailListItem[];
    [PriceMasterTablesEnum.priceMasterDetailHeader]: PriceMasterDetailHeader | undefined;
  }> {
    return {
      [PriceMasterTablesEnum.priceMasterDetailListItem]: await this.priceMasterDetailListItem
        .toArray(),
      [PriceMasterTablesEnum.priceMasterDetailHeader]: await this.priceMasterDetailHeader.get({
        SupplyChainRelationshipID: supplyChainRelationshipIs,
      }),
    }
  }

  async updatePriceMasterDetailList(
    params: {
      supplyChainRelationshipId: number;
      userType: PriceMasterUserType[keyof PriceMasterUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsDetailList({
      userType: params.userType,
      supplyChainRelationshipId: params.supplyChainRelationshipId,
      // isMarkedForDeletion: false,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    if (response.numberOfRecords > 0) {
      await this.priceMasterDetailListItem.clear();

      for (const priceMasterDetailListItem of response.priceMasterDetailList) {
        await this.priceMasterDetailListItem.put({
          ...priceMasterDetailListItem,
          SupplyChainRelationshipID: params.supplyChainRelationshipId,
        });
      }

      await this.priceMasterDetailHeader.put({
        ...response.priceMasterDetailHeader,
      });
    } else {
      await this.priceMasterDetailListItem.clear();
      await this.priceMasterDetailHeader.clear();
    }
  }
}
