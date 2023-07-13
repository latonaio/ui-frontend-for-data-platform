import { CacheDatabase } from '..';
import {
  AuthedUser,
  BillOfMaterialDetailProps,
  BillOfMaterialTablesEnum,
  UserTypeEnum,
  BillOfMaterialDetailListItem,
  BillOfMaterialDetailHeader,
} from '@/constants';
import { productInfoReduce } from '@/helpers/common';
import { readsDetailList } from '@/api/billOfMaterial/detail';
import { toLowerCase } from '@/helpers/common';
import { BillOfMaterialUserType } from '.';

export class Detail extends CacheDatabase {
  async getBillOfMaterialDetailList(
    billOfMaterial: number,
    userType: BillOfMaterialUserType[keyof BillOfMaterialUserType],
  ): Promise<{
    [BillOfMaterialTablesEnum.billOfMaterialDetailList]: BillOfMaterialDetailListItem[];
    [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: BillOfMaterialDetailHeader | undefined;
  }> {
    return {
      [BillOfMaterialTablesEnum.billOfMaterialDetailList]: await this.billOfMaterialDetailListOwnerProductionPlantBusinessPartnerItem
        .where('BillOfMaterial').equals(billOfMaterial)
        .toArray(),
      [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: await this.billOfMaterialDetailHeader.get({
        BillOfMaterial: billOfMaterial,
      }),
    }
  }

  async updateBillOfMaterialDetailList(
    params: {
      billOfMaterial: number;
      userType: BillOfMaterialUserType[keyof BillOfMaterialUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response: any = await readsDetailList({
      userType: params.userType,
      billOfMaterial: params.billOfMaterial,
      // isMarkedForDeletion: false,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    if (response.Item.length > 0) {
      for (const billOfMaterialDetailListItem of response.Item) {
        await this.billOfMaterialDetailListOwnerProductionPlantBusinessPartnerItem.put({
          ...billOfMaterialDetailListItem,
          BillOfMaterial: params.billOfMaterial,
        });
      }

      await this.billOfMaterialDetailHeader.put({
        ...response.Header[0],
      });
    } else {
      if (params.userType === toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)) {
        await this.billOfMaterialDetailListOwnerProductionPlantBusinessPartnerItem.clear();
      }

      await this.billOfMaterialDetailHeader.clear();
    }
  }
}
