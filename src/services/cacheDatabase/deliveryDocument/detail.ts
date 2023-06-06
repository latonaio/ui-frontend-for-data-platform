import { CacheDatabase } from '..';
import {
  AuthedUser, DeliveryDocumentDetailHeader, DeliveryDocumentDetailListItem,
  DeliveryDocumentDetailProps,
  DeliveryDocumentTablesEnum,
  UserTypeEnum
} from '@/constants';
import { productInfoReduce } from '@/helpers/common';
import { toLowerCase } from '@/helpers/common';
import { DeliveryDocumentUserType } from '.';
import {
  readsDetail,
  readsDetailList,
} from '@/api/deliveryDocument/detail';

export class Detail extends CacheDatabase {
  async getDeliveryDocumentDetailList(
    deliveryDocument: number,
    userType: DeliveryDocumentUserType[keyof DeliveryDocumentUserType],
  ): Promise<{
    [DeliveryDocumentTablesEnum.deliveryDocumentDetailList]: DeliveryDocumentDetailListItem[];
    [DeliveryDocumentTablesEnum.deliveryDocumentDetailHeader]: DeliveryDocumentDetailHeader | undefined;
  }> {
    if (userType === toLowerCase(UserTypeEnum.DeliverToParty)) {
      return {
        [DeliveryDocumentTablesEnum.deliveryDocumentDetailList]: await this.deliveryDocumentDetailListDeliverToPartyItem
          .where('DeliveryDocument')
          .equals(deliveryDocument)
          .toArray(),
        [DeliveryDocumentTablesEnum.deliveryDocumentDetailHeader]: await this.deliveryDocumentDetailHeader.get({
          DeliveryDocument: deliveryDocument,
        }),
      }
    }

    return {
      deliveryDocumentDetailList: await this.deliveryDocumentDetailListDeliverFromPartyItem
        .where('DeliveryDocument')
        .equals(deliveryDocument)
        .toArray(),
      deliveryDocumentDetailHeader: await this.deliveryDocumentDetailHeader.get({
        DeliveryDocument: deliveryDocument,
      }),
    }
  }

  async getDeliveryDocumentDetail(
    deliveryDocument: number,
    deliveryDocumentItem: number,
    product: string,
  ): Promise<DeliveryDocumentDetailProps | null> {
    const response = await this.deliveryDocumentDetail.get({
      DeliveryDocument: deliveryDocument.toString(),
      DeliveryDocumentItem: deliveryDocumentItem.toString(),
      Product: product,
    });

    if (response) {
      return {
        ...response,
        ProductInfo: productInfoReduce(response.ProductInfo || []),
      }
    }

    return null;
  }

  async updateDeliveryDocumentDetailList(
    params: {
      deliveryDocument: number;
      userType: DeliveryDocumentUserType[keyof DeliveryDocumentUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsDetailList({
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      itemCompleteDeliveryIsDefined: false,
      // itemDeliveryStatus: false,
      itemDeliveryBlockStatus: false,
      // isCancelled: false,
      // isMarkedForDeletion: false,
      deliveryDocument: params.deliveryDocument,
      userType: params.userType,
    });

    console.log(response)

    if (response.numberOfRecords > 0) {
      for (const deliveryDocumentDetailListItem of response.deliveryDocumentDetailList) {
        if (params.userType === toLowerCase(UserTypeEnum.DeliverToParty)) {
          await this.deliveryDocumentDetailListDeliverToPartyItem.put({
            ...deliveryDocumentDetailListItem,
            DeliveryDocument: params.deliveryDocument,
          });
        } else {
          await this.deliveryDocumentDetailListDeliverFromPartyItem.put({
            ...deliveryDocumentDetailListItem,
            DeliveryDocument: params.deliveryDocument,
          });
        }
      }

      await this.deliveryDocumentDetailHeader.put({
        ...response.deliveryDocumentDetailHeader,
      });
    } else {
      if (params.userType === toLowerCase(UserTypeEnum.DeliverToParty)) {
        await this.deliveryDocumentDetailListDeliverToPartyItem.clear();
      } else {
        await this.deliveryDocumentDetailListDeliverFromPartyItem.clear();
      }

      await this.deliveryDocumentDetailHeader.clear();
    }
  }

  async updateDeliveryDocumentDetail(
    params: {
      userType: DeliveryDocumentUserType[keyof DeliveryDocumentUserType];
      deliveryDocument: number;
      deliveryDocumentItem: number;
      product: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await readsDetail({
      userType: params.userType,
      deliveryDocument: params.deliveryDocument,
      deliveryDocumentItem: params.deliveryDocumentItem,
      product: params.product,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    await this.deliveryDocumentDetail.put({
      ...response.deliveryDocumentDetail,
      DeliveryDocument: params.deliveryDocument.toString(),
      DeliveryDocumentItem: params.deliveryDocumentItem.toString(),
      Product: params.product,
      BusinessPartner: params.businessPartner,
    });

    return {
      ...response.deliveryDocumentDetail,
      BusinessPartner: params.businessPartner,
      ProductInfo: productInfoReduce(response.deliveryDocumentDetail.ProductInfo || []),
    }
  }
}
