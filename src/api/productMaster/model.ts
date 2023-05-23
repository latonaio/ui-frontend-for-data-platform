import { Acceptor, AuthedUser } from '@/constants';

export interface ReadProductParams extends Acceptor {
  Product: {
    Product: string;
    ProductDescriptionByBusinessPartner?: {
      BusinessPartner: AuthedUser['businessPartner'],
      Language: AuthedUser['language'];
    },
    BusinessPartner?: {
      BusinessPartner: AuthedUser['businessPartner'],
      BPPlant?: {
        Plant: string;
      }
    }
  },
}

export interface ReadProductResponse {
  General: {
    ProductGroup: string;
  };
  ProductDescriptionByBusinessPartner: {
    BusinessPartner: number;
    Language: string;
    Product: string;
    ProductDescription: string;
  };
  Accounting: {
    Product: string;
    BusinessPartner: number;
    Plant: string;
    PriceUnitQty: string;
  };
  BPPlant: {
    Plant: string;
  }
}
