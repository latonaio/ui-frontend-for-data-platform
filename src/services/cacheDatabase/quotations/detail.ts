import { CacheDatabase } from '..';
import {
  AuthedUser,
  QuotationsTablesEnum,
  QuotationsDetailListItem,
  QuotationsDetailListHeader,
} from '@/constants';
import { readsDetailList } from '@/api/quotations/detail';
import { QuotationsUserType } from '.';

export class Detail extends CacheDatabase {
  async getQuotationsDetailList(
    quotations: number,
    userType: QuotationsUserType[keyof QuotationsUserType],
  ): Promise<{
    [QuotationsTablesEnum.quotationsListDetailListItem]: QuotationsDetailListItem[];
    [QuotationsTablesEnum.quotationsListDetailListHeader]: QuotationsDetailListHeader | undefined;
  }> {
    return {
      [QuotationsTablesEnum.quotationsListDetailListItem]: await this.quotationsListDetailListItem
        .toArray(),
      [QuotationsTablesEnum.quotationsListDetailListHeader]: await this.quotationsListDetailListHeader.get({
        Quotations: quotations,
      }),
    }
  }

  async updateQuotationsDetailList(
    params: {
      userType: QuotationsUserType[keyof QuotationsUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsDetailList({
      userType: params.userType,
      // isMarkedForDeletion: false,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    if (response.numberOfRecords > 0) {
      await this.quotationsListDetailListItem.clear();

      for (const quotationsListDetailListItem of response.quotationsDetailListItem) {
        await this.quotationsListDetailListItem.put({
          ...quotationsListDetailListItem,
        //   Quotation: params.quotations,
        });
      }

      await this.quotationsListDetailListHeader.put({
        ...response.quotationsDetailListHeader,
      });
    } else {
      await this.quotationsListDetailListItem.clear();
      await this.quotationsListDetailListHeader.clear();
    }
  }
}
