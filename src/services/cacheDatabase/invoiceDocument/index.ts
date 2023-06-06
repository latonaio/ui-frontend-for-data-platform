import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';

export interface InvoiceDocumentUserType {
  billToParty: string;
  billFromParty: string;
}

class InvoiceDocumentCache extends CacheDatabase implements List, Detail {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }

  async getInvoiceDocumentList() {
    return this.list.getInvoiceDocumentList();
  }

  async updateInvoiceDocumentList(
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: InvoiceDocumentUserType[keyof InvoiceDocumentUserType];
    }
  ) {
    return this.list.updateInvoiceDocumentList(params);
  }

  async getInvoiceDocumentDetailList(
    invoiceDocument: number,
    userType: InvoiceDocumentUserType[keyof InvoiceDocumentUserType],
  ) {
    return this.detail.getInvoiceDocumentDetailList(invoiceDocument, userType);
  }

  // async getInvoiceDocumentDetail(
  //   invoiceDocument: number,
  //   invoiceDocumentItem: number,
  //   product: string,
  // ) {
  //   return this.detail.getInvoiceDocumentDetail(invoiceDocument, invoiceDocumentItem, product);
  // }

  async updateInvoiceDocumentDetailList(
    params: {
      invoiceDocument: number;
      userType: InvoiceDocumentUserType[keyof InvoiceDocumentUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.detail.updateInvoiceDocumentDetailList(params);
  }
}

export const invoiceDocumentCache = new InvoiceDocumentCache();
