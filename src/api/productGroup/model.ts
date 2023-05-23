import { AuthedUser, Acceptor } from '@/constants';

export interface ReadProductGroupParams extends Acceptor {
  ProductGroup: {
    ProductGroup: string;
    ProductGroupText: {
      Language: AuthedUser['language'];
      ProductGroupName: string;
    }
  }
}

export interface ReadProductGroupResponse {
  ProductGroupText: {
    ProductGroup: string;
    Language: string;
    ProductGroupName: string;
  }
  Language: string;
  ProductGroup: string;
  ProductGroupName: string;
}
