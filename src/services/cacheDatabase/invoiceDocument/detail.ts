import { CacheDatabase } from '..';
import {
  AuthedUser,
  InvoiceDocumentTablesEnum,
  UserTypeEnum,
  InvoiceDocumentDetailListItem,
  InvoiceDocumentDetailHeader,
} from '@/constants';
import { toLowerCase } from '@/helpers/common';
import { InvoiceDocumentUserType } from '.';
import { readsDetailList } from '@/api/invoiceDocument/detail';

export class Detail extends CacheDatabase {
  async getInvoiceDocumentDetailList(
    invoiceDocument: number,
    userType: InvoiceDocumentUserType[keyof InvoiceDocumentUserType],
  ): Promise<{
    [InvoiceDocumentTablesEnum.invoiceDocumentDetailList]: InvoiceDocumentDetailListItem[];
    [InvoiceDocumentTablesEnum.invoiceDocumentDetailHeader]: InvoiceDocumentDetailHeader | undefined;
  }> {
    if (userType === toLowerCase(UserTypeEnum.BillToParty)) {
      return {
        [InvoiceDocumentTablesEnum.invoiceDocumentDetailList]: await this.invoiceDocumentDetailListBillToPartyItem
          .where('InvoiceDocument')
          .equals(invoiceDocument)
          .toArray(),
        [InvoiceDocumentTablesEnum.invoiceDocumentDetailHeader]: await this.invoiceDocumentDetailHeader.get({
          InvoiceDocument: invoiceDocument,
        }),
      }
    }

    return {
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailList]: await this.invoiceDocumentDetailListBillFromPartyItem
        .where('InvoiceDocument')
        .equals(invoiceDocument)
        .toArray(),
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailHeader]: await this.invoiceDocumentDetailHeader.get({
        InvoiceDocument: invoiceDocument,
      }),
    }
  }

  async updateInvoiceDocumentDetailList(
    params: {
      invoiceDocument: number;
      userType: InvoiceDocumentUserType[keyof InvoiceDocumentUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsDetailList({
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      itemPaymentBlockStatus: false,
      // isCancelled: false,
      invoiceDocument: params.invoiceDocument,
      userType: params.userType,
    });

    if (response.numberOfRecords > 0) {
      for (const invoiceDocumentDetailListItem of response.invoiceDocumentDetailList) {
        if (params.userType === toLowerCase(UserTypeEnum.BillToParty)) {
          await this.invoiceDocumentDetailListBillToPartyItem.put({
            ...invoiceDocumentDetailListItem,
            InvoiceDocument: params.invoiceDocument,
          });
        } else {
          await this.invoiceDocumentDetailListBillFromPartyItem.put({
            ...invoiceDocumentDetailListItem,
            InvoiceDocument: params.invoiceDocument,
          });
        }
      }

      await this.invoiceDocumentDetailHeader.put({
        ...response.invoiceDocumentDetailHeader,
      });
    } else {
      if (params.userType === toLowerCase(UserTypeEnum.BillToParty)) {
        await this.invoiceDocumentDetailListBillToPartyItem.clear();
      } else {
        await this.invoiceDocumentDetailListBillFromPartyItem.clear();
      }

      await this.invoiceDocumentDetailHeader.clear();
    }
  }
}
