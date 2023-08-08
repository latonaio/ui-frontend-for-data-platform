import { Accepter } from '@/constants';

export interface DeleteParams extends Accepter {
  Product: {
    Product: number;
    IsMarkedForDeletion: boolean;
  }
}
