import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersTablesEnum,
  UserTypeEnum,
  BuyerItem,
  SellerItem,
} from '@/constants';
import { reads } from '@/api/orders/list';
import { toLowerCase } from '@/helpers/common';
import { OrdersUserType } from './index';

export class List extends CacheDatabase {
  async getOrdersList(): Promise<{
    [OrdersTablesEnum.ordersListBuyerItem]: BuyerItem[];
    [OrdersTablesEnum.ordersListSellerItem]: SellerItem[];
  }> {
    return {
      [OrdersTablesEnum.ordersListBuyerItem]: [
        ...await this.ordersListBuyerItem.
        toArray(),
      ],
      [OrdersTablesEnum.ordersListSellerItem]: [
        ...await this.ordersListSellerItem.
        toArray(),
      ],
    }
  }

  async updateOrdersList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: OrdersUserType[keyof OrdersUserType];
    },
  ): Promise<void> {
    const response = await reads({
      headerCompleteDeliveryIsDefined: false,
      headerDeliveryBlockStatus: false,
      // isCancelled: false,
      // isMarkedForDeletion: false,
      headerDeliveryStatus: 'NP',
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    })

    if (params.userType === toLowerCase(UserTypeEnum.Buyer)) {
      await this.ordersListBuyerItem.clear();
      await this.ordersListBuyerItem.bulkAdd(response.ordersList || []);
    } else {
      await this.ordersListSellerItem.clear();
      await this.ordersListSellerItem.bulkAdd(response.ordersList || []);
    }
  }
}
