import { CacheDatabase } from '@/services/cacheDatabase';
import { SupplyChainRelationshipUserType } from './index';
import {
  AuthedUser,
  SupplyChainRelationshipTablesEnum,
  SupplyChainRelationshipDetailExconfList,
  SupplyChainRelationshipDetailExconfListHeader, ProductTablesEnum,
} from '@/constants';
import { reads } from '@/api/supplyChainRelationship/exconf';

export class Detail extends CacheDatabase {
  async getSupplyChainRelationshipDetailExconfList(
    supplyChainRelationshipId: number,
    userType: SupplyChainRelationshipUserType[keyof SupplyChainRelationshipUserType],
  ): Promise<{
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]: SupplyChainRelationshipDetailExconfList | null;
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]: SupplyChainRelationshipDetailExconfListHeader | null;
  }> {
    return {
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]:
      await this.supplyChainRelationshipDetailExconfList.get({ SupplyChainRelationshipID: supplyChainRelationshipId }) || null,
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]:
      await this.supplyChainRelationshipDetailExconfListHeader.get({ SupplyChainRelationshipID: supplyChainRelationshipId }) || null,
    };
  }

  async updateSupplyChainRelationshipDetailExconfList(
    params: {
      supplyChainRelationshipId: number;
      userType: SupplyChainRelationshipUserType[keyof SupplyChainRelationshipUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await reads({
      supplyChainRelationshipId: params.supplyChainRelationshipId,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    await this.supplyChainRelationshipDetailExconfList.clear();
    await this.supplyChainRelationshipDetailExconfListHeader.clear();

    // await this.supplyChainRelationshipDetailExconfList.put(response.supplyChainRelationshipDetailExconfList);
    // await this.supplyChainRelationshipDetailExconfListHeader.put(response.supplyChainRelationshipDetailExconfListHeader);

    await this.supplyChainRelationshipDetailExconfList.put(
      {
        SupplyChainRelationshipID: params.supplyChainRelationshipId,
        Existences: [
          {
            Content: 'General',
            Exist: true,
            Param: [],
          },
          {
            Content: 'Delivery',
            Exist: true,
            Param: [{
              SupplyChainRelationshipDeliveryID: 110000000,
              DeliverToParty: 201,
              DeliverToPartyName: 'A',
              DeliverFromParty: 201,
              DeliverFromPartyName: 'B',
            }],
          },
          {
            Content: 'DeliveryPlant',
            Exist: true,
            Param: [{
              SupplyChainRelationshipDeliveryID: 110000000,
              SupplyChainRelationshipDeliveryPlantID: 222,
              DeliverToParty: 'A',
              DeliverFromParty: '201',
              DeliverToPlant: 'B',
              DeliverFromPlant: 'B',
            }],
          },
          {
            Content: 'Billing',
            Exist: true,
            Param: [{
              SupplyChainRelationshipBillingID: 110000000,
              BlllToParty: 'A',
              BillFromParty: 'A',
            }],
          },
          {
            Content: 'Payment',
            Exist: true,
            Param: [{
              SupplyChainRelationshipPaymentID: 110000000,
              Payer: 'G',
              Payee: 'H',
            }],
          },
        ],
      });
    await this.supplyChainRelationshipDetailExconfListHeader.put({
      SupplyChainRelationshipID: params.supplyChainRelationshipId,
    });
  }
}
