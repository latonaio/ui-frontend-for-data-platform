import { CacheDatabase } from '..';
import {
  AuthedUser,
  QuotationsItem,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';

export interface QuotationsUserType {
  buyer: string;
  seller: string;
}

class QuotationsCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }


  async getQuotationsList() {
    return this.list.getQuotationsList();
  }

  async updateQuotationsList(
    params:
      {
        language: AuthedUser['language'];
        businessPartner: AuthedUser['businessPartner'];
        emailAddress: AuthedUser['emailAddress'];
        userType: QuotationsUserType[keyof QuotationsUserType];
      }
  ): Promise<void> {
    return await this.list.updateQuotationsList(params);
  }

  async getQuotationsDetailList(
    quotations: number,
    userType: QuotationsUserType[keyof QuotationsUserType],
  ) {
    return await this.detail.getQuotationsDetailList(quotations, userType);
  }

  async updateQuotationsDetailList(
    params: {
      userType: QuotationsUserType[keyof QuotationsUserType];
      language: string;
      businessPartner: number;
      emailAddress: string;
    }): Promise<void> {
    return await this.detail.updateQuotationsDetailList(params);
  }
}

export const quotationsCache = new QuotationsCache();
