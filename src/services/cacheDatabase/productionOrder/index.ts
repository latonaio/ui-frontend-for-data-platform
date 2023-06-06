import { CacheDatabase } from '..';
import {
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { List } from './list';
import { toLowerCase } from '@/helpers/common';
import { Detail } from './detail';

export interface ProductionOrderUserType {
  ownerProductionPlantBusinessPartner: string;
}

class ProductionOrderCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }

  async getProductionOrderList() {
    return this.list.getProductionOrderList();
  }


  async updateProductionOrderList(
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: ProductionOrderUserType[keyof ProductionOrderUserType];
    },
  ): Promise<void> {
    return await this.list.updateProductionOrderList(params);
  }

  async getProductionOrderDetailList(
    productionOrder: number,
    productionOrderItem: string,
    ) {
    return await this.detail.getProductionOrderDetailList(
      productionOrder,
      productionOrderItem,
    );
  }

  async getProductionOrderDetail(
    productionOrder: number,
    productionOrderItem: number,
    product: string,
  ) {
    return await this.detail.getProductionOrderDetail(
      productionOrder,
      productionOrderItem,
      product
    );
  }

  async updateProductionOrderDetailList(
    params: {
      productionOrder: number;
      userType: ProductionOrderUserType[keyof ProductionOrderUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.detail.updateProductionOrderDetailList(params);
  }

  async updateProductionOrderDetail(
    params: {
      productionOrder: number;
      productionOrderItem: number;
      product: string;
      userType: ProductionOrderUserType[keyof ProductionOrderUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return await this.detail.updateProductionOrderDetail(params);
  }
}

export const productionOrderCache = new ProductionOrderCache();

