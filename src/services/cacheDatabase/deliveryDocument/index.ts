import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';

export interface DeliveryDocumentUserType {
  deliverToParty: string;
  deliverFromParty: string;
}

class DeliveryDocumentCache extends CacheDatabase implements List, Detail {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }

  async getDeliveryDocumentList() {
    return this.list.getDeliveryDocumentList();
  }

  async updateDeliveryDocumentList(
    params: {
      userType: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.list.updateDeliveryDocumentList(params);
  }

  async getDeliveryDocumentDetailList(
    deliveryDocument: number,
    userType: string,
  ) {
    return this.detail.getDeliveryDocumentDetailList(deliveryDocument, userType);
  }

  async getDeliveryDocumentDetail(
    deliveryDocument: number,
    deliveryDocumentItem: number,
    product: string,
  ) {
    return this.detail.getDeliveryDocumentDetail(deliveryDocument, deliveryDocumentItem, product);
  }

  async updateDeliveryDocumentDetailList(
    params: {
      deliveryDocument: number;
      userType: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.detail.updateDeliveryDocumentDetailList(params);
  }

  async updateDeliveryDocumentDetail(
    params: {
      userType: string;
      deliveryDocument: number;
      deliveryDocumentItem: number;
      product: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.detail.updateDeliveryDocumentDetail(params);
  }
}

export const deliveryDocumentCache = new DeliveryDocumentCache();
