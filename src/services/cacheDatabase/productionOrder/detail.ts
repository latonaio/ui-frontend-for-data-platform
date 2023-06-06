import { CacheDatabase } from '..';
import {
  AuthedUser,
  ProductionOrderTablesEnum,
  ProductionOrderDetailListItem,
  ProductionOrderDetailHeader,
  UserTypeEnum, ProductionOrderDetailProps,
} from '@/constants';
import { productInfoReduce, toLowerCase } from '@/helpers/common';
import { ProductionOrderUserType } from './index';
import { InvoiceDocumentUserType } from '@/services/cacheDatabase/invoiceDocument';
import {
  readsDetailList,
  readsDetail,
} from '@/api/productionOrder/detail';
import { PromiseExtended, Table } from 'dexie';

export class Detail extends CacheDatabase {
  async getProductionOrderDetailList(
    productionOrder: number,
    userType: ProductionOrderUserType[keyof ProductionOrderUserType],
  ): Promise<{
    [ProductionOrderTablesEnum.productionOrderDetailList]:
      ProductionOrderDetailListItem[];
    [ProductionOrderTablesEnum.productionOrderDetailHeader]:
      ProductionOrderDetailHeader | undefined;
  }> {
    if (userType === toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)) {
      return {
        [ProductionOrderTablesEnum.productionOrderDetailList]:
          await this.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem
            .where('ProductionOrder')
            .equals(productionOrder)
            .toArray(),
        [ProductionOrderTablesEnum.productionOrderDetailHeader]:
          await this.productionOrderDetailHeader.get({ ProductionOrder: productionOrder }),
      }
    }

    return {
      [ProductionOrderTablesEnum.productionOrderDetailList]:
        await this.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem
          .where('ProductionOrder')
          .equals(productionOrder)
          .toArray(),
      [ProductionOrderTablesEnum.productionOrderDetailHeader]:
        await this.productionOrderDetailHeader.get({ ProductionOrder: productionOrder }),
    }
  }

  async getProductionOrderDetail(
    productionOrder: number,
    productionOrderItem: number,
    product: string,
  ): Promise<ProductionOrderDetailProps | null> {
    const response = await this.productionOrderDetail.get({
      ProductionOrder: productionOrder,
      ProductionOrderItem: productionOrderItem,
      Product: product,
    });

    if (response) {
      return {
        ...response,
      }
    }

    return null;
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
    const response = await readsDetailList({
      isMarkedForDeletion: false,
      // isCancelled: false,
      productionOrder: params.productionOrder,
      productionOrderIsReleased: true,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    if (response.numberOfRecords > 0) {
      for (const productionOrderDetailListItem of response.productionOrderDetailList) {
        if (params.userType === toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)) {
          await this.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem.put({
            ...productionOrderDetailListItem,
            ProductionOrder: params.productionOrder,
          });
        } else {

        }
      }

      await this.productionOrderDetailHeader.put({
        ...response.productionOrderDetailHeader,
        ProductionOrder: params.productionOrder,
      });
    } else {
      if (params.userType === toLowerCase(UserTypeEnum.OwnerProductionPlantBusinessPartner)) {
        await this.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem.clear();
      }

      await this.productionOrderDetailHeader.clear();
    }
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
  ): Promise<any> {
    const response = await readsDetail({
      productionOrder: params.productionOrder,
      productionOrderItem: params.productionOrderItem,
      product: params.product,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    this.productionOrderDetail.put({
      ...response.productionOrderDetail,
    });

    return {
      ...response.productionOrderDetail,
      ProductionOrder: params.productionOrder,
      // ProductInfo: productInfoReduce(response.productionOrderDetail. || []),
    }
  }
}
