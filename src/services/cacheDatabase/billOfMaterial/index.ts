import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';

export interface BillOfMaterialUserType {
  ownerProductionPlantBusinessPartner: string;
}

class BillOfMaterialCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }
  async getBillOfMaterialDetailList(
    billOfMaterial: number,
    userType: BillOfMaterialUserType[keyof BillOfMaterialUserType],
    ) {
    return await this.detail.getBillOfMaterialDetailList(billOfMaterial, userType);
  }

  async updateBillOfMaterialDetailList(
    params: {
      billOfMaterial: number;
      userType: BillOfMaterialUserType[keyof BillOfMaterialUserType];
      language: string;
      businessPartner: number;
      emailAddress: string;
    }): Promise<void> {
    return await this.detail.updateBillOfMaterialDetailList(params);
  }

  async getBillOfMaterialList() {
    return this.list.getBillOfMaterialList();
  }

  async updateBillOfMaterialList(params: {
    language: AuthedUser['language'];
    businessPartner: AuthedUser['businessPartner'];
    emailAddress: AuthedUser['emailAddress'];
    userType: BillOfMaterialUserType[keyof BillOfMaterialUserType];
  }): Promise<void> {
    return await this.list.updateBillOfMaterialList({
      language: params.language,
      businessPartner: params.businessPartner,
      emailAddress: params.emailAddress,
      userType: params.userType,
    });
  }
}

export const billOfMaterialCache = new BillOfMaterialCache();

