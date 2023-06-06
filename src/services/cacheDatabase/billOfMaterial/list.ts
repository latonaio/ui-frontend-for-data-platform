import { CacheDatabase } from '..';
import {
  BillOfMaterialTablesEnum,
  BillOfMaterialListItem,
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { reads } from '@/api/billOfMaterial/list';
import { toLowerCase } from '@/helpers/common';
import { BillOfMaterialUserType } from './index';

export class List extends CacheDatabase {
  async getBillOfMaterialList(): Promise<
    {
      [BillOfMaterialTablesEnum.billOfMaterialListOwnerBusinessPartnerItem]: BillOfMaterialListItem[];
    }> {
    return {
      [BillOfMaterialTablesEnum.billOfMaterialListOwnerBusinessPartnerItem]: [
        ...await this.billOfMaterialListOwnerBusinessPartnerItem
          .toArray(),
      ]
    }
  }

  async updateBillOfMaterialList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: BillOfMaterialUserType[keyof BillOfMaterialUserType];
    },
  ): Promise<void> {
    const response = await reads({
      // isMarkedForDeletion: false,
      userType: params.userType,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    })

    if (params.userType === toLowerCase(UserTypeEnum.OwnerBusinessPartner)) {
      await this.billOfMaterialListOwnerBusinessPartnerItem.clear();
      await this.billOfMaterialListOwnerBusinessPartnerItem.bulkAdd(response.billOfMaterialList || []);
    }
  }
}
