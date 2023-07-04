import { CacheDatabase } from '@/services/cacheDatabase';
import { OperationsUserType } from './index';
import {
  AuthedUser,
  OperationsDetailListItem,
  OperationsDetailHeader,
  OperationsTablesEnum,
  UserTypeEnum,
} from '@/constants';
import { productInfoReduce, toLowerCase } from '@/helpers/common';
import { readsDetailList } from '@/api/operations/detail';

export class Detail extends CacheDatabase {
  async getOperationsDetailList(
    operations: number,
    userType: OperationsUserType[keyof OperationsUserType],
  ): Promise<{
    [OperationsTablesEnum.operationsDetailList]:
      OperationsDetailListItem[];
    [OperationsTablesEnum.operationsDetailHeader]:
      OperationsDetailHeader | undefined;
  }> {
    if (userType === toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)) {
      return {
        [OperationsTablesEnum.operationsDetailList]:
          await this.operationsDetailListOwnerProductionPlantBusinessPartnerItem
            .toArray(),
        [OperationsTablesEnum.operationsDetailHeader]:
          await this.operationsDetailHeader.get({ Operations: operations }),
      };
    }

    return {
      [OperationsTablesEnum.operationsDetailList]:
        await this.operationsDetailListOwnerProductionPlantBusinessPartnerItem
          .toArray(),
      [OperationsTablesEnum.operationsDetailHeader]:
        await this.operationsDetailHeader.get({ Operations: operations }),
    };
  }


  async updateOperationsDetailList(
    params: {
      operations: number;
      userType: OperationsUserType[keyof OperationsUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsDetailList({
      // isCancelled: false,
      operations: params.operations,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    if (response.numberOfRecords > 0) {
      for (const operationsDetailListItem of response.operationsDetailList) {
        if (params.userType === toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)) {

          console.log(this.operationsDetailListOwnerProductionPlantBusinessPartnerItem)

          await this.operationsDetailListOwnerProductionPlantBusinessPartnerItem.put({
            ...operationsDetailListItem,
            Operations: params.operations,
          });
        } else {
        }
      }

      await this.operationsDetailHeader.put({
        ...response.operationsDetailHeader,
        Operations: params.operations,
      });
    } else {
      if (params.userType === toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)) {
        await this.operationsDetailListOwnerProductionPlantBusinessPartnerItem.clear();
      }

      await this.operationsDetailHeader.clear();
    }
  }
}
