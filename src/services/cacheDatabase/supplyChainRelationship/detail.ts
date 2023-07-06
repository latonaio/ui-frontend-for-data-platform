import { CacheDatabase } from '@/services/cacheDatabase';
import { SupplyChainRelationshipUserType } from './index';
import {
  AuthedUser,
  SupplyChainRelationshipTablesEnum,
  SupplyChainRelationshipDetailExconfList,
  SupplyChainRelationshipDetailExconfListHeader,
  SupplyChainRelationshipDetailList,
  SupplyChainRelationshipDetailHeader,
} from '@/constants';
import { reads as exconfReads } from '@/api/supplyChainRelationship/exconf';
import { reads as detailReads } from '@/api/supplyChainRelationship/detail';

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
    const response = await exconfReads({
      supplyChainRelationshipId: params.supplyChainRelationshipId,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    await this.supplyChainRelationshipDetailExconfList.clear();
    await this.supplyChainRelationshipDetailExconfListHeader.clear();

    await this.supplyChainRelationshipDetailExconfList.put(response.supplyChainRelationshipDetailExconfList);
    await this.supplyChainRelationshipDetailExconfListHeader.put(response.supplyChainRelationshipDetailExconfListHeader);
  }

  async getSupplyChainRelationshipDetail(
    supplyChainRelationshipId: number,
    userType: SupplyChainRelationshipUserType[keyof SupplyChainRelationshipUserType],
  ): Promise<{
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetail]: SupplyChainRelationshipDetailList | null;
    [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailHeader]: SupplyChainRelationshipDetailHeader | null;
  }> {
    return {
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetail]:
      await this.supplyChainRelationshipDetail.get({ SupplyChainRelationshipID: supplyChainRelationshipId }) || null,
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailHeader]:
      await this.supplyChainRelationshipDetailHeader.get({ SupplyChainRelationshipID: supplyChainRelationshipId }) || null,
    };
  }

  async updateSupplyChainRelationshipDetail(
    params: {
      supplyChainRelationshipId: number;
      userType: SupplyChainRelationshipUserType[keyof SupplyChainRelationshipUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await detailReads({
      supplyChainRelationshipId: params.supplyChainRelationshipId,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    await this.supplyChainRelationshipDetail.clear();
    await this.supplyChainRelationshipDetailHeader.clear();

    await this.supplyChainRelationshipDetail.put(response.supplyChainRelationshipContents);
    await this.supplyChainRelationshipDetailHeader.put(response.supplyChainRelationshipDetailHeader);
  }
}
