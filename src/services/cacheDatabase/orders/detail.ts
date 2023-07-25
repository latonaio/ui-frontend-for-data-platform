import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersProductDetailProps,
  OrdersTablesEnum,
  UserTypeEnum,
  OrdersDetailListItem,
  OrdersDetailHeader,
} from '@/constants';
import { productInfoReduce } from '@/helpers/common';
import { readsDetail, readsDetailList } from '@/api/orders/detail';
import { toLowerCase } from '@/helpers/common';
import { OrdersUserType } from '.';

export class Detail extends CacheDatabase {
  async getOrdersDetailList(
    orderId: number,
    userType: OrdersUserType[keyof OrdersUserType],
  ): Promise<{
    [OrdersTablesEnum.ordersDetailList]: OrdersDetailListItem[];
    [OrdersTablesEnum.ordersDetailHeader]: OrdersDetailHeader | undefined;
  }> {
    if (userType === toLowerCase(UserTypeEnum.Buyer)) {
      return {
        [OrdersTablesEnum.ordersDetailList]: await this.ordersDetailListBuyerItem.where('OrderID').equals(orderId).toArray(),
        [OrdersTablesEnum.ordersDetailHeader]: await this.ordersDetailHeader.get({
          OrderID: orderId,
        }),
      }
    }

    return {
      [OrdersTablesEnum.ordersDetailList]: await this.ordersDetailListSellerItem.where('OrderID').equals(orderId).toArray(),
      [OrdersTablesEnum.ordersDetailHeader]: await this.ordersDetailHeader.get({
        OrderID: orderId,
      }),
    }
  }

  async getOrdersDetail(
    orderId: number,
    orderItem: number,
    product: string,
  ): Promise<OrdersProductDetailProps | null> {
    const response = await this.ordersDetail.get({
      OrderID: orderId.toString(),
      OrderItem: orderItem.toString(),
      Product: product,
    });

    if (response) {
      return {
        ...response,
        ProductInfo: productInfoReduce(response.ProductInfo || []),
      }
    }

    return null;
  }

  async updateOrdersDetailList(
    params: {
      orderId: number;
      userType: OrdersUserType[keyof OrdersUserType];
      buyer: number | null;
      seller: number | null;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsDetailList({
      userType: params.userType,
      orderId: params.orderId,
      itemCompleteDeliveryIsDefined: false,
      itemDeliveryBlockStatus: false,
      buyer: params.buyer,
      seller: params.seller,
      // isCancelled: false,
      // isMarkedForDeletion: false,
      // itemDeliveryStatus: false,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    if (response?.Item?.length || [].length > 0) {
      for (const ordersDetailListItem of response.Item) {
        if (params.userType === toLowerCase(UserTypeEnum.Buyer)) {
          await this.ordersDetailListBuyerItem.put({
            ...ordersDetailListItem,
            OrderID: params.orderId,
          });
        } else {
          await this.ordersDetailListSellerItem.put({
            ...ordersDetailListItem,
            OrderID: params.orderId,
          });
        }
      }

      await this.ordersDetailHeader.put({
        ...response.HeaderWithItem[0],
        PaymentTermsList: response.paymentTerms,
        PaymentMethodList: response.paymentMethod,
        CurrencyList: response.currency,
        QuantityUnitList: response.quantityUnit,
      });
    } else {
      if (params.userType === toLowerCase(UserTypeEnum.Buyer)) {
        await this.ordersDetailListBuyerItem.clear();
      } else {
        await this.ordersDetailListSellerItem.clear();
      }

      await this.ordersDetailHeader.clear();
    }
  }

  async updateOrdersDetail(
    params: {
      userType: string;
      orderId: number;
      orderItem: number;
      product: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await readsDetail({
      userType: params.userType,
      orderId: params.orderId,
      orderItem: params.orderItem,
      product: params.product,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    await this.ordersDetail.put({
      ...response.ordersDetail,
      OrderID: params.orderId.toString(),
      OrderItem: params.orderItem.toString(),
      Product: params.product,
      BusinessPartner: params.businessPartner,
    });

    return {
      ...response.ordersDetail,
      ProductInfo: productInfoReduce(response.ordersDetail.ProductInfo || []),
      OrderID: params.orderId.toString(),
      OrderItem: params.orderItem.toString(),
      Product: params.product,
      BusinessPartner: params.businessPartner,
    };
  }
}
