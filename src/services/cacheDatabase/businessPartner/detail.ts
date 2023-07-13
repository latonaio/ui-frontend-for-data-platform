import { CacheDatabase } from '@/services/cacheDatabase';
import { BusinessPartnerUserType } from './index';
import {
  AuthedUser,
  BusinessPartnerTablesEnum,
  BusinessPartnerDetailExconfList,
  BusinessPartnerDetailExconfListHeader,
} from '@/constants';
import { reads } from '@/api/businessPartner/exconf';

export class Detail extends CacheDatabase {
  async getBusinessPartnerDetailExconfList(
    businessPartner: number,
    userType: BusinessPartnerUserType[keyof BusinessPartnerUserType],
  ): Promise<{
    [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]: BusinessPartnerDetailExconfList | null;
    [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]: BusinessPartnerDetailExconfListHeader | null;
  }> {
    return {
      [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]:
      await this.businessPartnerDetailExconfList.get({ BusinessPartner: businessPartner }) || null,
      [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]:
      await this.businessPartnerDetailExconfListHeader.get({ BusinessPartner: businessPartner }) || null,
    };
  }

  async updateBusinessPartnerDetailExconfList(
    params: {
      userType: BusinessPartnerUserType[keyof BusinessPartnerUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await reads({
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    await this.businessPartnerDetailExconfList.clear();
    await this.businessPartnerDetailExconfListHeader.clear();

    // await this.supplyChainRelationshipDetailExconfList.put(response.supplyChainRelationshipDetailExconfList);
    // await this.supplyChainRelationshipDetailExconfListHeader.put(response.supplyChainRelationshipDetailExconfListHeader);

    await this.businessPartnerDetailExconfList.put(
      {
        BusinessPartner: params.businessPartner,
        Existences: [
          {
            Content: 'General',
            Exist: true,
            Param: [{
				BusinessPartnerFullName: 'aaaaa',
				Industry: 'vvv',
				LegalEntityRegistration:  111,
				Country: 'B',
				Language: '222',
				Currency: '333',
				AddressID: 111,
			}],
          },
          {
            Content: 'GeneralFinInst',
            Exist: true,
            Param: [],
          },
          {
            Content: 'Role',
            Exist: true,
            Param: [],
          },
          {
            Content: 'Accounting',
            Exist: true,
            Param: [],
          },
          {
            Content: 'Address',
            Exist: true,
            Param: [],
          },
        
        ],
      });
    await this.businessPartnerDetailExconfListHeader.put({
        BusinessPartner: params.businessPartner,
        BusinessPartnerName: '',
        IsMarkedForDeletion: false,
    });
  }
}


