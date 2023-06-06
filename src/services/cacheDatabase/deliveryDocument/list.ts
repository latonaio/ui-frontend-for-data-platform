import { CacheDatabase } from '..';
import {
  AuthedUser,
  DeliveryDocumentTablesEnum,
  UserTypeEnum,
  DeliverToPartyItem,
  DeliverFromPartyItem,
  DeliveryDocumentListEdit, DeliveryDocumentListEditForCache,
} from '@/constants';
import { toLowerCase } from '@/helpers/common';
import { readsList } from '@/api/deliveryDocument/list';
import { DeliveryDocumentUserType } from './index';

export class List extends CacheDatabase {
  async getDeliveryDocumentList(): Promise<
    {
      [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem]: DeliveryDocumentListEditForCache[];
      [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem]: DeliveryDocumentListEditForCache[];
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: DeliverToPartyItem[];
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: DeliverFromPartyItem[];
    }> {
    return {
      [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem]: [
        ...await this.deliveryDocumentListEditDeliverToPartyItem
          .toArray()
      ],
      [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem]: [
        ...await this.deliveryDocumentListEditDeliverFromPartyItem
          .toArray(),
      ],
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: [
        ...await this.deliveryDocumentListDeliverToPartyItem
          .toArray()
      ],
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: [
        ...await this.deliveryDocumentListDeliverFromPartyItem
          .toArray()
      ],
    }
  }

  async updateDeliveryDocumentList (
    params: {
      userType: DeliveryDocumentUserType[keyof DeliveryDocumentUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsList({
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
      // headerCompleteDeliveryIsDefined: false,
      // headerDeliveryStatus: false,
      // headerBillingStatus: false,
      // headerDeliveryBlockStatus: false,
      // headerIssuingBlockStatus: false,
      // headerReceivingBlockStatus: false,
      // headerBillingBlockStatus: false,
      headerBillingStatusException: 'CL',
      // isCancelled: false,
      // isMarkedForDeletion: false,
    });

    if (params.userType === toLowerCase(UserTypeEnum.DeliverToParty)) {
      await this.deliveryDocumentListDeliverToPartyItem.clear();
      await this.deliveryDocumentListDeliverToPartyItem.bulkAdd(response.deliveryDocuments || []);
      for (const key in response?.deliveryDocumentListEdit?.pullDown?.SupplyChains) {
        await this.deliveryDocumentListEditDeliverToPartyItem.put({
          SupplyChainRelationshipID: Number(key),
          DeliverToParty: response?.deliveryDocumentListEdit?.pullDown?.SupplyChains[key]?.DeliverToParty || [],
          DeliverFromParty: response?.deliveryDocumentListEdit?.pullDown?.SupplyChains[key]?.DeliverFromParty || [],
        });
      }
    } else {
      await this.deliveryDocumentListDeliverFromPartyItem.clear();
      await this.deliveryDocumentListDeliverFromPartyItem.bulkAdd(response.deliveryDocuments || []);
      for (const key in response?.deliveryDocumentListEdit?.pullDown?.SupplyChains) {
        await this.deliveryDocumentListEditDeliverFromPartyItem.put({
          SupplyChainRelationshipID: Number(key),
          DeliverToParty: response?.deliveryDocumentListEdit?.pullDown?.SupplyChains[key]?.DeliverToParty || [],
          DeliverFromParty: response?.deliveryDocumentListEdit?.pullDown?.SupplyChains[key]?.DeliverFromParty || [],
        });
      }
    }
  }
}
