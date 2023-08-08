import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersDetailListItem,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';

export interface OrdersUserType {
  buyer: string;
  seller: string;
}

class OrdersCache extends CacheDatabase implements List, Detail {
  private list: List;
  private detail: Detail;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
  }

  async getOrdersDetailList(
    orderId: number,
    userType: OrdersUserType[keyof OrdersUserType],
    ) {
    return await this.detail.getOrdersDetailList(orderId, userType);
  }

  async getOrdersDetail(orderId: number, orderItem: number, product: string) {
    return await this.detail.getOrdersDetail(orderId, orderItem, product);
  }

  async updateOrdersDetailList(
    params: {
      orderId: number;
      userType: OrdersUserType[keyof OrdersUserType];
      language: string;
      businessPartner: number;
      emailAddress: string;
    }): Promise<void> {
    return await this.detail.updateOrdersDetailList(params);
  }

  async updateOrdersDetail(
    params: {
      userType: string;
      orderId: number;
      orderItem: number;
      product: string;
      language: string;
      businessPartner: number;
      emailAddress: string;
    }) {
    return await this.detail.updateOrdersDetail(params);
  }

  async getOrdersList() {
    return this.list.getOrdersList();
  }

  async updateOrdersList(
    params:
      {
        language: AuthedUser['language'];
        businessPartner: AuthedUser['businessPartner'];
        emailAddress: AuthedUser['emailAddress'];
        userType: OrdersUserType[keyof OrdersUserType];
      }
  ): Promise<void> {
    return await this.list.updateOrdersList(params);
  }
}

export const ordersCache = new OrdersCache();
