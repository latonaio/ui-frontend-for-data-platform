import { CacheDatabase } from '..';
import {
  AuthedUser,
  InvoiceDocumentTablesEnum,
  UserTypeEnum,
  InvoiceDocumentListItem,
} from '@/constants';
import { toLowerCase } from '@/helpers/common';
import { readsList } from '@/api/invoiceDocument/list';
import { InvoiceDocumentUserType } from '@/services/cacheDatabase/invoiceDocument/index';

export class List extends CacheDatabase {
  async getInvoiceDocumentList(): Promise<{
    [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]: InvoiceDocumentListItem[];
    [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]: InvoiceDocumentListItem[];
  }> {
    return {
      [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]: [
        ...await this.invoiceDocumentListBillToPartyItem
          .toArray(),
      ],
      [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]: [
        ...await this.invoiceDocumentListBillFromPartyItem
          .toArray(),
      ]
    }
  };

  async updateInvoiceDocumentList (
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: InvoiceDocumentUserType[keyof InvoiceDocumentUserType];
    },
  ): Promise<void> {
    const response = await readsList({
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
      headerPaymentBlockStatus: false,
      // isCancelled: false,
    });

    if (params.userType === toLowerCase(UserTypeEnum.BillToParty)) {
      await this.invoiceDocumentListBillToPartyItem.clear();
      await this.invoiceDocumentListBillToPartyItem.bulkAdd(response.invoiceDocuments || []);
    } else {
      await this.invoiceDocumentListBillFromPartyItem.clear();
      await this.invoiceDocumentListBillFromPartyItem.bulkAdd(response.invoiceDocuments || []);
    }
  }
}
