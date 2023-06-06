import { CacheDatabase } from '..';
import {
  EquipmentTablesEnum,
  EquipmentItem,
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { reads } from '@/api/equipment/list';
import { toLowerCase } from '@/helpers/common';
import { EquipmentUserType } from './index';

export class List extends CacheDatabase {
  async getEquipmentList(): Promise<
    {
      [EquipmentTablesEnum.equipmentListBusinessPartnerItem]: EquipmentItem[];
    }> {
    return {
      [EquipmentTablesEnum.equipmentListBusinessPartnerItem]: [
        ...await this.equipmentListBusinessPartnerItem
          .orderBy('Equipment')
          .reverse()
          .toArray(),
      ]
    }
  }

  async updateEquipmentList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: EquipmentUserType[keyof EquipmentUserType];
    },
  ): Promise<void> {
    const response = await reads({
      // isMarkedForDeletion: false,
      userType: params.userType,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    })

    if (params.userType === toLowerCase(UserTypeEnum.BusinessPartner)) {
      await this.equipmentListBusinessPartnerItem.clear();
      await this.equipmentListBusinessPartnerItem.bulkAdd(response.equipmentList || []);
    }
  }
}
